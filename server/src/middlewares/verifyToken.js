// Importa la instancia configurada de Firebase Admin
const admin = require('../config/firebaseAdminConfig');

const verifyToken = (req, res, next) => {
  // Extrae el token de ID de los headers de la solicitud
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(403).send('Se requiere autenticación. Token no proporcionado.');
  }

  // Verifico el token using Firebase Admin SDK
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      // El token es válido, adjunta el UID del usuario al objeto req para su uso en rutas subsiguientes
      req.user = decodedToken;
      // Llama a next() para continuar con el próximo middleware en la cadena
      next();
    }).catch((error) => {
      // El token no es válido o ocurrió un error durante la verificación
      console.error('Error al verificar el token de Firebase ID', error);
      res.status(403).send('Token inválido o error al verificar la autenticación.');
    });
};

module.exports = verifyToken;
