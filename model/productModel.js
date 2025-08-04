const db = require("../config/db"); // db là Pool của 'pg'

// Lấy toàn bộ thiết bị
const getAllDevice = async () => {
  const { rows } = await db.query(`SELECT * FROM devices`);
  return rows;
};

// Lấy thiết bị theo ID và các thuộc tính
const getDeviceById = async (id) => {
  const deviceRes = await db.query(`SELECT * FROM devices WHERE id = $1`, [id]);
  const device = deviceRes.rows[0];
  if (!device) return null;

  const attributeRes = await db.query(
    `SELECT attribute_name, attribute_value 
     FROM device_attributes 
     WHERE device_id = $1`,
    [id]
  );

  return { ...device, attribute: attributeRes.rows };
};

// Tạo thiết bị mới
const createDevice = async (
  name,
  model,
  status,
  priority,
  desc,
  attributes = []
) => {
  const insertDeviceRes = await db.query(
    `INSERT INTO devices (name, model, status, priority_level, description)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [name, model, status || "Active", priority, desc]
  );

  const deviceId = insertDeviceRes.rows[0].id;

  for (const { name: attrName, value: attrValue } of attributes) {
    await db.query(
      `INSERT INTO device_attributes (device_id, attribute_name, attribute_value)
       VALUES ($1, $2, $3)`,
      [deviceId, attrName, attrValue]
    );
  }

  return deviceId;
};

// Cập nhật thiết bị
const updateDevice = async (id, data) => {
  await db.query(
    `UPDATE devices 
     SET name = $1, function = $2, code = $3, type = $4, location = $5, 
         status = $6, priority_level = $7, description = $8 
     WHERE id = $9`,
    [name, func, code, type, location, status, priority, desc, id]
  );

  // Có thể cập nhật bằng cách xóa thuộc tính cũ rồi thêm lại
  await db.query(`DELETE FROM device_attributes WHERE device_id = $1`, [id]);

  for (const { name: attrName, value: attrValue } of attributes) {
    await db.query(
      `INSERT INTO device_attributes (device_id, attribute_name, attribute_value)
       VALUES ($1, $2, $3)`,
      [id, attrName, attrValue]
    );
  }
};

// Xóa thiết bị
const deleteDevice = async (id) => {
  await db.query(`DELETE FROM devices WHERE id = $1`, [id]);
};

// Lịch sử bảo trì của thiết bị
const maintenanceHistory = async (device_id) => {
  const { rows } = await db.query(
    `SELECT mh.*, d.name AS device_name, u.fullname AS technician_name
     FROM maintenance_history mh
     JOIN devices d ON mh.device_id = d.id
     JOIN users u ON mh.performed_by = u.id
     WHERE mh.device_id = $1
     ORDER BY mh.maintenance_date DESC`,
    [device_id]
  );
  return rows;
};

module.exports = {
  getAllDevice,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  maintenanceHistory,
};
