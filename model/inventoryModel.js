const db = require("../config/db");

const addTransaction = async (transaction) => {
  const { spare_part_id, type, quantity, price, date, note, created_by } =
    transaction;

  const result = await db.query(
    `INSERT INTO inventory_transactions
      (spare_part_id, type, quantity, price, date, note, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [spare_part_id, type, quantity, price, date, note, created_by]
  );

  return result.rows[0];
};

const getTransactions = async () => {
  const result = await db.query(
    `SELECT it.*, sp.name AS spare_part_name, u.fullname AS created_by_name
     FROM inventory_transactions it
     LEFT JOIN spare_parts sp ON it.spare_part_id = sp.id
     LEFT JOIN users u ON it.created_by = u.id
     ORDER BY it.date DESC`
  );
  return result.rows;
};

module.exports = {
  addTransaction,
  getTransactions,
};
