const machineDetailModel = require("../model/machineDetailModel");

const getMachineDetails = async (req, res) => {
  try {
    const details = await machineDetailModel.getAllMachineDetails();
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch machine details" });
  }
};

const createMachineDetail = async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const result = await machineDetailModel.createMachineDetail({
      name,
      type,
      description,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create machine detail" });
  }
};

module.exports = { getMachineDetails, createMachineDetail };
