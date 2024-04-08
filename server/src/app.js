import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'

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

app.get('/', (req, res) => {
  res.send('Hello World from green steps server!');
});



export default app;
