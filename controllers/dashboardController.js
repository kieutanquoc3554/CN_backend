const DashboardModel = require("../model/dashboardModel");

const DashboardController = {
  async getOverview(req, res) {
    try {
      const [
        deviceStats,
        scheduleStats,
        upcomingMaintenance,
        workOrderStats,
        weeklySchedule,
        workload,
      ] = await Promise.all([
        DashboardModel.getDevicesByStatus(),
        DashboardModel.countScheduleProgress(),
        DashboardModel.getUpcomingMaintenance(),
        DashboardModel.getWorkOrderCompletionStats(),
        DashboardModel.getThisWeekSchedule(),
        DashboardModel.getWorkloadPerTechnician(),
      ]);

      res.json({
        deviceStats,
        scheduleStats,
        upcomingMaintenance,
        workOrderStats,
        weeklySchedule,
        workload,
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dashboard:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getThisWeekSchedule(req, res) {
    try {
      const data = await DashboardModel.getThisWeekSchedule();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to get schedule for this week" });
    }
  },
};

module.exports = DashboardController;
