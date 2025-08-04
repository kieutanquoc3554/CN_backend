const db = require("../config/db");

const getByWorkOrderId = async (work_order_id) => {
  const result = await db.query(
    `SELECT a.*, u.fullname AS technician_name
     FROM assignments a
     JOIN users u ON a.technician_id = u.id
     WHERE work_order_id = $1`,
    [work_order_id]
  );
  return result.rows;
};

const assignTechnician = async (technician, work_order_id, assigned_at) => {
  const result = await db.query(
    `INSERT INTO assignments (technician_id, work_order_id, assigned_at)
     VALUES ($1, $2, $3) RETURNING id`,
    [technician, work_order_id, assigned_at]
  );
  return { id: result.rows[0].id };
};

module.exports = { getByWorkOrderId, assignTechnician };
