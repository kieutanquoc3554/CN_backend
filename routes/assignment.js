const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

router.post("/", assignmentController.assignTechnician);
router.get(
  "/by-work-order/:work_order_id",
  assignmentController.getAssignmentsByWorkOrder
);

module.exports = router;
