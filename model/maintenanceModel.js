const db = require("../config/db");

const getAll = async () => {
  const result =
    await db.query(`SELECT ms.*, d.name AS device_name, mt.name AS maintenance_type_name
                    FROM maintenance_schedule ms
                    JOIN devices d ON ms.device_id = d.id
                    JOIN maintenance_types mt ON ms.maintenance_type_id = mt.id`);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(
    `SELECT * FROM maintenance_schedule WHERE id =$1`,
    [id]
  );
  return result.rows[0];
};

const create = async (data) => {
  const {
    device_id,
    maintenance_type_id,
    schedule_type,
    frequency_value,
    frequency_unit,
    next_due_date,
    note,
  } = data;
  const result = await db.query(
    `INSERT INTO maintenance_schedule (
        device_id, maintenance_type_id, schedule_type,
        frequency_value, frequency_unit, next_due_date, note
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      device_id,
      maintenance_type_id,
      schedule_type,
      frequency_value,
      frequency_unit,
      next_due_date,
      note,
    ]
  );
  return { id: result.rows[0].id, ...data };
};

const update = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
  const result = await db.query(
    `UPDATE maintenance_schedule SET ${setClause} WHERE id = $${
      keys.length + 1
    }`,
    [...values, id]
  );
  return result.rowCount;
};

const deleteSchedule = async (id) => {
  const result = await db.query(
    `DELETE FROM maintenance_schedule WHERE id = $1`,
    [id]
  );
  return result.rowCount;
};

const updateStatusSchedule = async (id, progress_step) => {
  const result = await db.query(
    `UPDATE maintenance_schedule SET progress_step = $1 WHERE id = $2`,
    [progress_step, id]
  );
  return result.rowCount;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSchedule,
  updateStatusSchedule,
};
