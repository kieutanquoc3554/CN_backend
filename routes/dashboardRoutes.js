const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");

// GET /api/dashboard
router.get("/", DashboardController.getOverview);
router.get("/this-week-schedule", DashboardController.getThisWeekSchedule);

module.exports = router;
