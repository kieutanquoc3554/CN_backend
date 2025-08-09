const express = require("express");
const router = express.Router();
const {
  getSpareParts,
  createSparePart,
  getSparePartByDeviceId,
} = require("../controllers/sparePartController");

router.get("/", getSpareParts);
router.post("/", createSparePart);
router.get("/:id", getSparePartByDeviceId);

module.exports = router;
