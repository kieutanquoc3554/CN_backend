const express = require("express");
const {
  getAll,
  createNewDevices,
  getDevice,
  getHistoryByDevice,
  updateDevice,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getAll);
router.post("/", createNewDevices);
router.get("/:id", getDevice);
router.get("/history/by-device", getHistoryByDevice);
router.put("/:id", updateDevice);

module.exports = router;
