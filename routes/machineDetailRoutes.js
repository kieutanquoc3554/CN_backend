const express = require("express");
const router = express.Router();
const {
  getMachineDetails,
  createMachineDetail,
} = require("../controllers/machineDetailController");

router.get("/", getMachineDetails);
router.post("/", createMachineDetail);

module.exports = router;
