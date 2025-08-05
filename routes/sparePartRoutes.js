const express = require("express");
const router = express.Router();
const {
  getSpareParts,
  createSparePart,
} = require("../controllers/sparePartController");

router.get("/", getSpareParts);
router.post("/", createSparePart);

module.exports = router;
