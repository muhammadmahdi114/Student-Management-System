const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year_of_birth: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  martial_status: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  teaching: {
    type: String,
    required: true,
  },
  khidmat: {
    type: String,
    required: false,
  },
  committee: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('Student', StudentSchema);