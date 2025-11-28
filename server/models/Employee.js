const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Employee', employeeSchema);
