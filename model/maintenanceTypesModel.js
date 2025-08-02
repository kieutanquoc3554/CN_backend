const db = require("../config/db");

const getAll = async () => {
  const result = await db.query(`SELECT * FROM maintenance_types`);
  return result.rows;
};

const create = async (name, description) => {
  const result = await db.query(
    `INSERT INTO maintenance_types (name, description) VALUES ($1, $2) RETURNING id`,
    [name, description]
  );
  return result.rows[0].id;
};

module.exports = { getAll, create };
