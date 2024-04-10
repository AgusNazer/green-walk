const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String, // Por ejemplo, "earn", "spend", "exchange"
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String, // Detalles sobre la transacción, como "Caminata de 5 km" o "Compra en mercado interno"
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
