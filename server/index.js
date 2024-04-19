// import app from './src/app.js'; 
const app = require('./src/app.js');



const port = process.env.PORT || 3001;

app.listen(port, '192.168.1.74', () => {
  console.log(`Servidor Express escuchando en http://192.168.1.74:${port}`);
});