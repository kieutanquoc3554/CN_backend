const sparePartModel = require("../model/sparePartModel");

const getAllSparePart = async (req, res) => {
  try {
    const parts = await sparePartModel.getAll();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSparePartById = async (req, res) => {
  try {
    const part = await sparePartModel.getById(req.params.id);
    if (!part)
      return res.status(404).json({ message: "Không tìm thấy vật tư" });
    res.json(part);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createSparePart = async (req, res) => {
  try {
    const id = await sparePartModel.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSparePart = async (req, res) => {
  try {
    await sparePartModel.update(req.params.id, req.body);
    res.status(500).json({ error: err.message });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSparePart = async (req, res) => {
  try {
    await sparePartModel.remove(req.params.id);
    res.json({ message: "Xoá thành công" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllSparePart,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
};
