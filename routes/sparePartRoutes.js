const express = require("express");
const router = express.Router();
const sparePartController = require("../controllers/sparePartController");

router.get("/", sparePartController.getAllSparePart);
router.post("/", sparePartController.createSparePart);
router.get("/:id", sparePartController.getSparePartById);
router.put("/:id", sparePartController.updateSparePart);
router.delete("/:id", sparePartController.deleteSparePart);

module.exports = router;
