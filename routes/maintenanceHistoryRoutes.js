const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceHistoryController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.createNewHistory);
router.put("/:id", controller.updateHistory);
router.delete("/:id", controller.removeHistory);

module.exports = router;
