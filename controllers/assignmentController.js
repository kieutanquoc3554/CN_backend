const assignmentModel = require("../model/assignmentModel");

const assignTechnician = async (req, res) => {
  try {
    const { technician_id, work_order_id } = req.body;
    const assigned_at = new Date();
    const data = { technician_id, work_order_id, assigned_at };
    const result = await assignmentModel.assignTechnician(data);
    res
      .status(201)
      .json({ message: "Technician assigned successfully", id: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssignmentsByWorkOrder = async (req, res) => {
  try {
    const assignments = await assignmentModel.getByWorkOrderId(
      req.params.work_order_id
    );
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  assignTechnician,
  getAssignmentsByWorkOrder,
};
