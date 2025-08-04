const db = require("../config/db");

// Dem thiet bi theo trang thai
const getDevicesByStatus = async () => {
  const result = await db.query(`SELECT status, COUNT(*) AS count
                                FROM devices
                                GROUP BY status`);
  return result.rows;
};

// Tinh tien do bao tri theo progress_step
const countScheduleProgress = async () => {
  const result = await db.query(`SELECT progress_step, COUNT(*) AS count
      FROM maintenance_schedule
      GROUP BY progress_step`);
  return result.rows;
};

module.exports = { getDevicesByStatus, countScheduleProgress };
