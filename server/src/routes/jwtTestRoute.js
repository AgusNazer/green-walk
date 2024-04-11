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
    // Asume que el token se pasa en el encabezado de autorización como "Bearer <token>"
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).send('Token no proporcionado o malformado');
    }
    const idToken = header.split('Bearer ')[1];

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            res.json({ uid: decodedToken.uid, status: "Token verificado correctamente" });
        })
        .catch((error) => {
            console.error(error);
            res.status(401).send('Token no válido');
        });
});
module.exports = router;