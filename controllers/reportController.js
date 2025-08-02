const reportModel = require("../model/reportModel");

const createReport = async (req, res) => {
  try {
    const report = await reportModel.createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReportsByWorkOrder = async (req, res) => {
  try {
    const reports = await reportModel.getByWorkOrderId(
      req.params.work_order_id
    );
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReport,
  getReportsByWorkOrder,
};
