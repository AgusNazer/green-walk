// import mongoose from 'mongoose';
const mongoose = require('mongoose')

// interface IUser {
//   username: string;
//   email: string;
//   password: string;
// }

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  tokens: {
    type: Number,
    required: true,
    default: 0,
  },
  activities: [{
    date: Date,
    duration: Number,
    distance: Number,
    tokensEarned: Number,
  }],
  transactions: [{
    type: { type: String, enum: ['earn', 'spend'] },
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now },
  }],
  preferences: {
    interestedIn: [String],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

// export default User;

module.exports = User;
