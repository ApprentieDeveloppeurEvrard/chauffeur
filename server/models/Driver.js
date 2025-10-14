const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', driverSchema);


