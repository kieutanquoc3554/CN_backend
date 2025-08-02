const db = require("../config/db");

const getAll = async () => {
  const result = await db.query(`
    SELECT sp.*, dt.type_name AS device_type_name 
    FROM spare_parts sp
    LEFT JOIN device_types dt ON sp.linked_device_type_id = dt.id;
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query("SELECT * FROM spare_parts WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const create = async (data) => {
  const { name, quantity, warning_threshold, linked_device_type_id, unit } =
    data;
  const result = await db.query(
    `INSERT INTO spare_parts (name, quantity, warning_threshold, linked_device_type_id, unit)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [name, quantity, warning_threshold, linked_device_type_id, unit]
  );
  return result.rows[0].id;
};

const update = async (id, data) => {
  const { name, quantity, warning_threshold, linked_device_type_id, unit } =
    data;
  await db.query(
    `UPDATE spare_parts 
     SET name = $1, quantity = $2, warning_threshold = $3, 
         linked_device_type_id = $4, unit = $5
     WHERE id = $6`,
    [name, quantity, warning_threshold, linked_device_type_id, unit, id]
  );
};

const remove = async (id) => {
  await db.query("DELETE FROM spare_parts WHERE id = $1", [id]);
};

module.exports = { getAll, getById, create, update, remove };
