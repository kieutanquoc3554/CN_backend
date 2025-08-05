const db = require("../config/db");

const getAllMachineDetails = async () => {
  const result = await db.query(
    "SELECT * FROM machine_details ORDER BY id DESC"
  );
  return result.rows;
};

const createMachineDetail = async ({ name }) => {
  const query = `
    INSERT INTO machine_details (name)
    VALUES ($1)
    RETURNING id, name
  `;
  const values = [name];
  const { rows } = await db.query(query, values);
  return rows[0];
};

module.exports = { getAllMachineDetails, createMachineDetail };
