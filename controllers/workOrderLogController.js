const workOrderLogModel = require("../model/workOrderLogModel");

const addLog = async (req, res) => {
  try {
    const { work_order_id, status_before, status_after, changed_by } = req.body;
    const changed_at = new Date();
    const result = await workOrderLogModel.addLog({
      work_order_id,
      status_before,
      status_after,
      changed_by,
      changed_at,
    });
    res.status(201).json({ message: "Log added", id: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const logs = await workOrderLogModel.getLogsByWorkOrder(
      req.params.work_order_id
    );
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addLog,
  getLogs,
};
