const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/", maintenanceController.getAllMaintenanceSchedule);
router.get("/:id", maintenanceController.getById);
router.post("/", maintenanceController.create);
router.put("/:id", maintenanceController.update);
router.delete("/:id", maintenanceController.deleteSchedule);
router.put("/status/:id", maintenanceController.updateStatusSchedule);

module.exports = router;
