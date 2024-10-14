const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // Personal Information
  full_name: {
    type: String,
    required: true
  },
  roll_no: {
    type: Number, 
    required: false
  },
  father_name: {
    type: String,
    required: true
  },
  father_profession: {
    type: String,
    required: false
  },
  father_contact: {
    type: Number,
    required: false
  },
  year_of_birth: {
    type: Date,
    required: true
  },
  marital_status: {
    type: String,
    required: true
  },
  blood_group: {
    type: String,
    required: false
  },
  hometown: {
    type: String,
    required: false
  },
  languages: {
    type: [String],
    required: false
  },
  blood_relative_in_classes: {
    name: {
      type: String,
      required: false
    },
    relationship: {
      type: String,
      required: false
    },
    class: {
      type: String,
      required: false
    }
  },

  highest_education_level: {
    type: String,
    required: true
  },
  highest_education_institute: {
    type: String,
    required: false
  },
  class_name: {
    type: String, 
    required: true
  },
  teacher_name: {
    type: String,
    required: true
  },
  date_of_joining_current_class: {
    type: Date,
    required: true
  },
  date_of_joining_association: {
    type: Date,
    required: false 
  },

  contact_no: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  resident_address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },

  // Professional Details
  profession: {
    type: String,
    required: true
  },
  current_job_role: {
    type: String,
    required: false
  },
  office_name: {
    type: String,
    required: false
  },
  office_address: {
    type: String,
    required: false
  },

  // Association Information
  committee_member: {
    type: Boolean,
    required: false
  },
  committee_name: {
    type: String,
    required: false
  },
  date_of_joining_committee: {
    type: Date,
    required: false
  },

  // Referral Information
  referred_by: {
    name: {
      type: String,
      required: false
    },
    contact_no: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    }
  }
});

module.exports = mongoose.model('Student', StudentSchema);
