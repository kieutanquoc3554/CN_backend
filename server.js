const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const maintenanceTypeRoutes = require("./routes/maintenanceTypeRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const workOrderRoutes = require("./routes/workOrder");
const assignmentRoutes = require("./routes/assignment");
const reportRoutes = require("./routes/report");
const workOrderLogRoutes = require("./routes/workOrderLog");
const historyRoutes = require("./routes/maintenanceHistoryRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const machineDetailRoutes = require("./routes/machineDetailRoutes.js");
const sparePartRoutes = require("./routes/sparePartRoutes.js");
const inventoryRoutes = require("./routes/inventoryRoutes.js");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/devices", productRoutes);
app.use("/api/maintenanceTypes", maintenanceTypeRoutes);
app.use("/api/schedules", maintenanceRoutes);
app.use("/api/work-orders", workOrderRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/logs", workOrderLogRoutes);
app.use("/api/maintenance-history", historyRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/machine-details", machineDetailRoutes);
app.use("/api/spare-parts", sparePartRoutes);
app.use("/api/inventory", inventoryRoutes);
app.get("/", (req, res) => {
  res.json({ msg: "Hello from Node backend" });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
