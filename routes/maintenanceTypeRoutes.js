const express = require("express");
const router = express.Router();
const maintenanceTypesController = require("../controllers/maintenanceTypesController");

router.get("/", maintenanceTypesController.getAllTypes);
router.post("/", maintenanceTypesController.createMaintenanceType);

module.exports = router;
