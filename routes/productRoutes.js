const express = require("express");
const {
  getAll,
  createNewDevices,
  getDevice,
  getHistoryByDevice,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getAll);
router.post("/", createNewDevices);
router.get("/:id", getDevice);
router.get("/history/by-device", getHistoryByDevice);

module.exports = router;
