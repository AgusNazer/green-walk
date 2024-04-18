// const app = require('./src/app.js');

// const port = process.env.PORT || 3001;

// app.listen(port, '192.168.1.51', () => {
//   console.log(`Servidor Express escuchando en http://192.168.1.51:${port}`);
// });



// Codigo original
//-------------------------------------------------------------------------------
// Codigo temporal para traer la IpV4 del equipo local



const app = require('./src/app.js');
const os = require('os');

const port = process.env.PORT || 3001;

function getLocalIpAddress() { // funcion para traer la IpV4 del equipo local
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