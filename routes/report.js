const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.post("/", reportController.createReport);
router.get(
  "/by-work-order/:work_order_id",
  reportController.getReportsByWorkOrder
);

module.exports = router;
