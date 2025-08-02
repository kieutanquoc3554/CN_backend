const workOrderModel = require("../model/workOrderModel");
const assignmentModel = require("../model/assignmentModel");

const getAll = async (req, res) => {
  try {
    const order = await workOrderModel.getAll();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createWorkOrder = async (req, res) => {
  try {
    const newOrder = await workOrderModel.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkOrdersBySchedule = async (req, res) => {
  try {
    const workOrders = await workOrderModel.getWorkOrdersBySchedule(
      req.params.schedule_id
    );
    res.json(workOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const pickTechnicianForWorkOrder = async (req, res) => {
  try {
    const { technician, work_order_id } = req.body;
    const { id } = req.params;
    const assigned_at = new Date();
    await workOrderModel.pickTechnicianForWorkOrder(id, technician);
    await assignmentModel.assignTechnician(
      technician,
      work_order_id,
      assigned_at
    );
    res.status(200).json({ message: "Phân công nhân viên thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};

const updateWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await workOrderModel.updateWorkOrder(Number(id), updateData);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy phiếu công việc!" });
    }

    res.status(200).json({ message: "Cập nhật phiếu công việc thành công!" });
  } catch (error) {
    console.error("Update Work Order Error:", error);
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};

module.exports = {
  getAll,
  createWorkOrder,
  getWorkOrdersBySchedule,
  pickTechnicianForWorkOrder,
  updateWorkOrder,
};
