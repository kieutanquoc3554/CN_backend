const db = require("../config/db");

const getByWorkOrderId = async (work_order_id) => {
  const result = await db.query(
    `SELECT * FROM maintenance_reports WHERE work_order_id = $1`,
    [work_order_id]
  );
  return result.rows;
};

const createReport = async (data) => {
  const {
    device_id,
    work_order_id,
    performed_by,
    maintenance_date,
    status,
    condition_after,
    common_issues,
  } = data;

  const result = await db.query(
    `INSERT INTO maintenance_reports (
      device_id, work_order_id, performed_by,
      maintenance_date, status, condition_after, common_issues
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      device_id,
      work_order_id,
      performed_by,
      maintenance_date,
      status,
      condition_after,
      common_issues,
    ]
  );
  return { id: result.rows[0].id, ...data };
};

module.exports = { getByWorkOrderId, createReport };
