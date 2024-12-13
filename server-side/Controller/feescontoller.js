// controllers/feesController.js
const Fees = require('../Model/fees.model');

exports.createFees = async (req, res) => {
  try {
    const fees = new Fees(req.body);
    await fees.save();
    res.status(201).json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFees = async (req, res) => {
  try {
    const fees = await Fees.find().populate('studentId');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeesById = async (req, res) => {
  try {
    const fees = await Fees.findById(req.params.id).populate('studentId');
    if (!fees) return res.status(404).json({ message: 'Fees not found' });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFees = async (req, res) => {
  try {
    const fees = await Fees.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFees = async (req, res) => {
  try {
    await Fees.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fees deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
