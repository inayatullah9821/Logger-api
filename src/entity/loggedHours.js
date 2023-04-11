const { Schema, model, default: mongoose } = require('mongoose');

const loggedHourSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  billable: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = model('LoggedHours', loggedHourSchema);
