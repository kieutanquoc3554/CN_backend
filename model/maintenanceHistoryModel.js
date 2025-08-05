const db = require("../config/db");

const getAllHistory = async () => {
  const result =
    await db.query(`SELECT mh.*, d.name, u.fullname FROM maintenance_history mh
                                    LEFT JOIN devices d ON d.id = mh.device_id
                                    LEFT JOIN users u ON u.id = mh.performed_by
                                    ORDER BY mh.maintenance_date DESC;`);
  return result.rows;
};

const getHistoryById = async () => {
  const result = await db.query(
    "SELECT * FROM maintenance_history WHERE id = ?",
    [id]
  );
  return result.rows[0];
};

const createHistory = async (data) => {
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
    `INSERT INTO maintenance_history (device_id, work_order_id, performed_by, maintenance_date, status, condition_after, common_issues) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
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
  return { id: result.rows[0].id };
};

const updateHistory = async (id, data) => {
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
    `UPDATE maintenance_history 
     SET device_id = $1, work_order_id = $2, performed_by = $3, 
         maintenance_date = $4, status = $5, condition_after = $6, common_issues = $7 
     WHERE id = $8`,
    [
      device_id,
      work_order_id,
      performed_by,
      maintenance_date,
      status,
      condition_after,
      common_issues,
      id,
    ]
  );
  return result;
};

const removeHistory = async (id) => {
  const result = await db.query(
    "DELETE FROM maintenance_history WHERE id = $1",
    [id]
  );
  return result;
};

module.exports = {
  getAllHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  removeHistory,
};
