// // jwtTestRoute.js
const express = require('express');
const admin = require('../services/firebaseAdminConfig'); 

const router = express.Router();

// router.get('/', (req, res) => {
//   const idToken = req.query.token; // O podrías recibir el token en un encabezado de autorización

//   admin.auth().verifyIdToken(idToken)
//     .then((decodedToken) => {
//       res.json({ uid: decodedToken.uid, status: "Token verificado correctamente" });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(401).send('Token no válido');
//     });
// });

// module.exports = router;

router.get('/', (req, res) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        console.log("Token no proporcionado o malformado");
        return res.status(401).send('Token no proporcionado o malformado');
    }

    const idToken = header.split('Bearer ')[1];
    console.log("Verificando token:", idToken);

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            console.log("Token verificado correctamente", decodedToken);
            res.json({ uid: decodedToken.uid, status: "Token verificado correctamente" });
        })
        .catch((error) => {
            console.error("Error al verificar token:", error);
            res.status(401).send('Token no válido');
        });
});

module.exports = router;