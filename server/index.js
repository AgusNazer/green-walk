// import app from './src/app.js'; 
const app = require('./src/app.js');
const os = require('os');

const port = process.env.PORT || 3001;

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (let i = 0; i < iface.length; i++) {
      const { address, family, internal } = iface[i];
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return 'localhost'; // Si no se encuentra ninguna IP, devuelve 'localhost'
}

const ipAddress = getLocalIpAddress();

app.listen(port, ipAddress, () => {
  console.log(`Servidor Express escuchando en ${ipAddress}, ${port}`);
});