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
    required: false,
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
  wallet: {
    type: String,
    required: false,
    default: null,
  },
  country: {
    type: String,
    required: false,  // Dependiendo de si quieres que siempre se especifique un país
  },
  objective: {
    type: String,
    required: false,  // Dependiendo de la necesidad de este campo en la lógica de negocio
  },
  carbonFootprint: {
    type: Number,
    required: false,  // Este podría ser String o Number, dependiendo de cómo desees manejarlo
  },
  tokensGanados: {
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
