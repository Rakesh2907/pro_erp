const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  client: {
    type: String,
  },
  shareWithOptions: {
    type: String,
  },
  specificMembers: {
    type: [String], // Array of strings
  },
  repeat: {
    type: Boolean,
  },
  selectedEveryParam: {
    type: String,
  },
  cycles: {
    type: Number,
  },
  color: {
    type: String,
  },
  loginUser: {
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;