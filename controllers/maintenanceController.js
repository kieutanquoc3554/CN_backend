const moment = require("moment");
const maintenanceModel = require("../model/maintenanceModel");
const workOrderModel = require("../model/workOrderModel");

const getAllMaintenanceSchedule = async (req, res) => {
  try {
    const schedules = await maintenanceModel.getAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const schedules = await maintenanceModel.getById(req.params.id);
    if (!schedules) return res.status(404).json({ message: "Not found" });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const newSchedule = await maintenanceModel.create(req.body);
    const workOrderData = {
      device_id: req.body.device_id,
      schedule_id: newSchedule.id,
      maintenance_type_id: req.body.maintenance_type_id,
      start_time: req.body.next_due_date,
      end_time: null,
      performed_by: null,
      description: "Tự động tạo từ lịch bảo trì",
      status: "Pending",
      note: "",
    };

    const newWorkOrder = await workOrderModel.create(workOrderData);
    res.status(201).json({
      schedule: newSchedule,
      firstWorkOrder: newWorkOrder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (updatedData.next_due_date) {
      updatedData.next_due_date = moment(updatedData.next_due_date).format(
        "YYYY-MM-DD"
      );
    }
    const result = await maintenanceModel.update(req.params.id, updatedData);
    if (result === 0) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const result = await maintenanceModel.deleteSchedule(req.params.id);
    if (result === 0) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatusSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress_step } = req.body;
    const result = await maintenanceModel.updateStatusSchedule(
      id,
      progress_step
    );
    if (result === 0)
      return res.status(404).json({ message: "Không tìm thấy lịch bảo trì" });
    return res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMaintenanceSchedule,
  getById,
  create,
  update,
  deleteSchedule,
  updateStatusSchedule,
};
