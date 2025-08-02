const db = require("../config/db");

const getLogsByWorkOrder = async (work_order_id) => {
  const result = await db.query(
    `SELECT wl.*, u.fullname
     FROM work_order_logs wl
     JOIN users u ON wl.changed_by = u.id
     WHERE wl.work_order_id = $1
     ORDER BY changed_at DESC`,
    [work_order_id]
  );
  return result.rows;
};

const addLog = async (data) => {
  const { work_order_id, status_before, status_after, changed_by, changed_at } =
    data;
  const result = await db.query(
    `INSERT INTO work_order_logs (work_order_id, status_before, status_after, changed_by, changed_at)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [work_order_id, status_before, status_after, changed_by, changed_at]
  );
  return { id: result.rows[0].id, ...data };
};

module.exports = { getLogsByWorkOrder, addLog };
