const express = require("express");
const router = express.Router();
const workOrderController = require("../controllers/workOrderController");

router.post("/", workOrderController.createWorkOrder);
router.get(
  "/by-schedule/:schedule_id",
  workOrderController.getWorkOrdersBySchedule
);
router.get("/", workOrderController.getAll);
router.post("/assign", workOrderController.pickTechnicianForWorkOrder);
router.put("/update/:id", workOrderController.updateWorkOrder);
router.delete("/:id", workOrderController.deleteWorkOrder);

module.exports = router;
