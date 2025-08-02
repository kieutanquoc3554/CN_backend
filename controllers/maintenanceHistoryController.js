const maintenanceHistoryModel = require("../model/maintenanceHistoryModel");

const getAll = async (req, res) => {
  try {
    const data = await maintenanceHistoryModel.getAllHistory();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await maintenanceHistoryModel.getHistoryById(id);
    if (!data)
      return res.status(404).json({ message: "Không tìm thấy lịch sử" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createNewHistory = async (req, res) => {
  try {
    const newRecord = await maintenanceHistoryModel.createHistory(req.body);
    res
      .status(201)
      .json({ message: "Thêm lịch sử bảo trì thành công!", id: newRecord.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHistory = async (req, res) => {
  try {
    await maintenanceHistoryModel.updateHistory(req.params.id, req.body);
    res.json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const removeHistory = async (req, res) => {
  try {
    await maintenanceHistoryModel.removeHistory(req.params.id);
    res.json({ message: "Xoá bản ghi thành công!" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createNewHistory,
  updateHistory,
  removeHistory,
};
