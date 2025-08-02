const db = require("../config/db");

const getAll = async () => {
  const result = await db.query(`
    SELECT 
      wo.*, 
      d.name AS device_name, 
      mt.name AS maintenance_type_name,
      u.fullname AS technician_name
    FROM work_orders wo
    JOIN devices d ON wo.device_id = d.id
    JOIN maintenance_types mt ON wo.maintenance_type_id = mt.id
    LEFT JOIN users u ON wo.performed_by = u.id
  `);
  return result.rows;
};

const create = async (data) => {
  const {
    device_id,
    schedule_id,
    maintenance_type_id,
    start_time,
    end_time,
    performed_by,
    description,
    status,
    note,
  } = data;

  const result = await db.query(
    `INSERT INTO work_orders (
      device_id, schedule_id, maintenance_type_id, start_time,
      end_time, performed_by, description, status, note
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id`,
    [
      device_id,
      schedule_id,
      maintenance_type_id,
      start_time,
      end_time,
      performed_by,
      description,
      status,
      note,
    ]
  );
  return { id: result.rows[0].id, ...data };
};

const getWorkOrdersBySchedule = async (schedule_id) => {
  const result = await db.query(
    `SELECT * FROM work_orders WHERE schedule_id = $1`,
    [schedule_id]
  );
  return result.rows;
};

const pickTechnicianForWorkOrder = async (id, technician) => {
  const result = await db.query(
    `UPDATE work_orders SET performed_by = $1 WHERE id = $2`,
    [technician, id]
  );
  return result.rowCount; // 1 nếu thành công
};

const updateWorkOrder = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const query = `UPDATE work_orders SET ${setClause} WHERE id = $${
    keys.length + 1
  }`;

  const result = await db.query(query, [...values, id]);
  return result.rowCount;
};

module.exports = {
  getAll,
  create,
  getWorkOrdersBySchedule,
  pickTechnicianForWorkOrder,
  updateWorkOrder,
};
