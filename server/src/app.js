// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js'
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const userActivity = require('./routes/userActivity.js')
// test de firebase jwt
// require('./services/firebaseAdminConfig.js');
const jwtTestRoute = require('./routes/jwtTestRoute.js')



dotenv.config();

const app = express();
app.use(express.json());



// Conexión a la base de datos
const mongoDb= process.env.MONGODB_URI;
if (!mongoDb) {
  console.error('La variable MONGODB_URI no está definida en las variables de entorno.');
  process.exit(1); // Detiene la ejecución del programa
}
mongoose.connect(mongoDb)
  .then(() => console.log('Connection with MongoDB success'))
  .catch((err) => console.error(err));

  // Rutas
app.use('/users', userRoutes);
app.use('/activities', userActivity)
// test jwt firebase
app.use('/verifyToken', jwtTestRoute);

app.use((req, res, next) => {
  console.log(`Recibida solicitud: ${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World from green steps server!');
});



module.exports = app;
