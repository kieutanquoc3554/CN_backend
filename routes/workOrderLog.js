const express = require("express");
const router = express.Router();
const workOrderLogController = require("../controllers/workOrderLogController");

router.post("/", workOrderLogController.addLog);
router.get("/by-work-order/:work_order_id", workOrderLogController.getLogs);

module.exports = router;
