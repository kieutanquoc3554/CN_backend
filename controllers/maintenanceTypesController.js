const maintenanceTypesModel = require("../model/maintenanceTypesModel");

const getAllTypes = async (req, res) => {
  try {
    const types = await maintenanceTypesModel.getAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createMaintenanceType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newType = await maintenanceTypesModel.create(name, description);
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllTypes, createMaintenanceType };
