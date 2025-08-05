const db = require("../config/db");

const getAllSpareParts = async () => {
  const result = await db.query(`
    SELECT sp.*, d.name AS device_name, md.name AS detail_name
    FROM spare_parts sp
    LEFT JOIN devices d ON sp.device_id = d.id
    LEFT JOIN machine_details md ON sp.detail_id = md.id
    ORDER BY sp.id DESC
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

module.exports = {
  getAllSpareParts,
  createSparePart,
};
