const sparePartModel = require("../model/sparePartModel");

const getSpareParts = async (req, res) => {
  try {
    const parts = await sparePartModel.getAllSpareParts();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spare parts" });
  }
};

const createSparePart = async (req, res) => {
  try {
    const part = req.body;
    const newPart = await sparePartModel.createSparePart(part);
    res.status(201).json(newPart);
  } catch (error) {
    res.status(500).json({ error: "Failed to create spare part" });
  }
};

module.exports = { getSpareParts, createSparePart };
