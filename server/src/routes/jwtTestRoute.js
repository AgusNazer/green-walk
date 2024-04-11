const express = require('express');
const firebase = require('firebase/app');
require('firebase/auth');

// Asegúrate de inicializar Firebase en tu app
const firebaseConfig = {
  apiKey: "AIzaSyDLv2w5DhwvHfN6NDAmd0u_xJyXSHp0v2U",
  authDomain: "greendly.firebaseapp.com",
  // Resto de tu configuración de Firebase
};
firebase.initializeApp(firebaseConfig);

const router = express.Router();

router.get('/', (req, res) => {
  const email = "userjwt-test@jwt.com"; // Correo electrónico del usuario de prueba
  const password = "123123"; // Contraseña del usuario de prueba

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.getIdToken();
    })
    .then((idToken) => {
      res.json({ idToken });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error al generar el token de ID');
    });
});

module.exports = router;
