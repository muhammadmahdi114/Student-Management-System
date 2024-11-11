const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  committee: {
    type: String,
    required: true,
  },
  adminRole: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Member', MemberSchema);
