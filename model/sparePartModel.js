const db = require("../config/db");

const getAllSpareParts = async () => {
  const result = await db.query(`
    SELECT sp.*, d.name AS device_name, md.name AS detail_name
    FROM spare_parts sp
    LEFT JOIN devices d ON sp.device_id = d.id
    LEFT JOIN machine_details md ON sp.detail_id = md.id
    ORDER BY d.name DESC
  `);
  return result.rows;
};

const createSparePart = async (part) => {
  const {
    name,
    code,
    unit,
    current_stock,
    min_stock_level,
    device_id,
    detail_id,
  } = part;

  const result = await db.query(
    `
    INSERT INTO spare_parts 
    (name, code, unit, current_stock, min_stock_level, device_id, detail_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [name, code, unit, current_stock, min_stock_level, device_id, detail_id]
  );
  return result.rows[0];
};

const getSparePartById = async (id) => {
  const result = await db.query(`SELECT * FROM spare_parts WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
};

const updateStock = async (id, newStock) => {
  const result = await db.query(
    `UPDATE spare_parts SET current_stock = $1 WHERE id = $2 RETURNING *`,
    [newStock, id]
  );
  return result.rows[0];
};

module.exports = {
  getAllSpareParts,
  createSparePart,
  getSparePartById,
  updateStock,
};
