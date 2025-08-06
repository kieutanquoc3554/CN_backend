// === Route: routes/inventoryRoutes.js ===
const express = require("express");
const router = express.Router();
const {
  updateSparePartStock,
  getAllTransactions,
  getInventoryReport,
} = require("../controllers/inventoryController");

router.put("/:id/update-stock", updateSparePartStock);
router.get("/transactions", getAllTransactions);
router.get("/transactions/report", getInventoryReport);

module.exports = router;
