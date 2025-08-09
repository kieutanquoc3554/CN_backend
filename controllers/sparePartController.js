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

const getSparePartByDeviceId = async (req, res) => {
  try {
    const { id } = req.params;
    const spare_part = await sparePartModel.getSparePartByDeviceId(id);
    res.status(200).json(spare_part);
  } catch (error) {
    res.status(500).json({ error: "Không tải được danh sách vật tư" });
  }
};

module.exports = {
  getSpareParts,
  createSparePart,
  getSparePartByDeviceId,
};
