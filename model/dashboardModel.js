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

const getUpcomingMaintenance = async () => {
  const result = await db.query(`SELECT d.id, d.name, ms.next_due_date
      FROM maintenance_schedule ms
      JOIN devices d ON ms.device_id = d.id
      WHERE ms.next_due_date IS NOT NULL
  AND ms.next_due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'`);
  return result.rows;
};

const getWorkOrderCompletionStats = async () => {
  const result = await db.query(`SELECT
        COUNT(*) FILTER (WHERE status = 'Completed') AS completed,
        COUNT(*) FILTER (WHERE status != 'Completed') AS pending
      FROM work_orders`);
  return result.rows;
};

const getThisWeekSchedule = async () => {
  const result = await db.query(`SELECT d.name, ms.next_due_date
FROM maintenance_schedule ms
JOIN devices d ON ms.device_id = d.id
WHERE ms.next_due_date >= date_trunc('week', current_date)
  AND ms.next_due_date < date_trunc('week', current_date) + interval '7 days'
ORDER BY ms.next_due_date ASC;
`);
  return result.rows;
};

const getWorkloadPerTechnician = async () => {
  const result =
    await db.query(`SELECT u.fullname AS technician, COUNT(*) AS total_work_orders
FROM assignments a
JOIN technicians t ON a.technician_id = t.user_id
JOIN users u ON t.user_id = u.id
GROUP BY u.fullname
ORDER BY total_work_orders DESC;
`);
  return result.rows;
};

module.exports = {
  getDevicesByStatus,
  countScheduleProgress,
  getUpcomingMaintenance,
  getWorkOrderCompletionStats,
  getThisWeekSchedule,
  getWorkloadPerTechnician,
};
