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

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  // Priorizar direcciones IPv4 sobre IPv6
  const sortedInterfaces = Object.values(interfaces)
    .flat()
    .sort((a, b) => (a.family === 'IPv4' ? -1 : 1));

  for (const iface of sortedInterfaces) {
    const { address, family, internal } = iface;
    if (family === 'IPv4' && !internal) {
      return address;
    }
  }
  return 'localhost';
}

const ipAddress = getLocalIpAddress();

// app.listen(port, ipAddress, () => {
//   console.log(`Servidor Express escuchando en ${ipAddress}, ${port}`);
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});