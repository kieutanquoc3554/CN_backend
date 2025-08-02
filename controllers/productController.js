const {
  getAllDevice,
  createDevice,
  getDeviceById,
  maintenanceHistory,
} = require("../model/productModel");

const getAll = async (req, res) => {
  const devices = await getAllDevice();
  return res.status(200).json(devices);
};

const createNewDevices = async (req, res) => {
  const { name, model, status, priority, desc, attributes } = req.body;
  const id = await createDevice(
    name,
    model,
    status,
    priority,
    desc,
    attributes
  );
  return res.status(201).json({ message: "Đã tạo thiết bị", id });
};

const getDevice = async (req, res) => {
  const { id } = req.params;
  const device = await getDeviceById(id);
  if (!device)
    return res.status(404).json({ message: "Không tìm thấy thiết bị" });
  return res.status(200).json(device);
};

const getHistoryByDevice = async (req, res) => {
  const { device_id } = req.query;
  if (!device_id) {
    return res.status(400).json({ error: "Thiếu device_id" });
  }
  try {
    const history = await maintenanceHistory(device_id);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, createNewDevices, getDevice, getHistoryByDevice };
