const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  distance: {
    type: Number, // Puede ser en kilómetros o millas, dependiendo de la zona, hay que definirlo
    required: true,
  },
  duration: {
    type: Number, // Duración en minutos o segundos
    required: true,
  },
  tokensEarned: {
    type: Number,
    required: false,
  },
}, { timestamps: true });

const UserActivity = mongoose.model('UserActivity', activitySchema);

module.exports = UserActivity;
