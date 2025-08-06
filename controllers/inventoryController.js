// === Controller: inventoryController.js ===
const inventoryModel = require("../model/inventoryModel");
const sparePartModel = require("../model/sparePartModel");
const db = require("../config/db");

const updateSparePartStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_stock, note, price, created_by } = req.body;
    const oldPart = await sparePartModel.getSparePartById(id);

    if (!oldPart) return res.status(404).json({ error: "Part not found" });

    const diff = current_stock - oldPart.current_stock;
    const type = diff > 0 ? "IN" : "OUT";

    if (diff !== 0) {
      await inventoryModel.addTransaction({
        spare_part_id: id,
        type,
        quantity: Math.abs(diff),
        price: type === "IN" ? price : null,
        date: new Date(),
        note,
        created_by,
      });
    }

    const updatedPart = await sparePartModel.updateStock(id, current_stock);
    res.json(updatedPart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await inventoryModel.getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const getInventoryReport = async (req, res) => {
  try {
    const report = await db.query(`
      SELECT 
        m.id,
        m.name,
        m.code,
        m.unit,
        m.min_stock_level AS minimum_stock,
        m.current_stock,
        (
          SELECT price
          FROM inventory_transactions it2
          WHERE it2.spare_part_id = m.id AND it2.type = 'IN'
          ORDER BY it2.date DESC
          LIMIT 1
        ) AS price,
        md.name AS machine_detail,
        d.name AS machine_group,
        MAX(CASE WHEN it.type = 'IN' THEN it.date END) AS last_import_date,
        MAX(CASE WHEN it.type = 'OUT' THEN it.date END) AS last_export_date
      FROM spare_parts m
      LEFT JOIN inventory_transactions it ON m.id = it.spare_part_id
      LEFT JOIN machine_details md ON m.detail_id = md.id
      LEFT JOIN devices d ON m.device_id = d.id
      GROUP BY 
        m.id, m.name, m.code, m.unit, m.min_stock_level, m.current_stock, md.name, d.name;
    `);

    const result = report.rows.map((row) => ({
      ...row,
      total: row.price ? row.price * row.current_stock : 0,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching inventory report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateSparePartStock,
  getAllTransactions,
  getInventoryReport,
};
