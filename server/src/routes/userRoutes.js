const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

// registro de usuario
router.post('/register', userController.register);

router.post('/saveUser', userController.saveUser);


// inicio de sesion ( JWT )
// router.post('/login', userController.login);

// update user
router.put('/:id', userController.updateProfile);

// // change password
// router.put('/change-password', userController.changePassword);

// // recovery password
// router.post('/forgot-password', userController.forgotPassword);

// // reset password
// router.post('/reset-password', userController.resetPassword);

//get user
router.get('/getAllUsers', userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Ruta para obtener el ID de MongoDB usando el email
router.get('/getMongoUserId/:email', userController.getMongoUserIdByEmail);
// info profile
// router.get('/profile', userController.getProfile);

// // delete user
// router.delete('/delete-account', userController.deleteAccount);

// delete all users
router.delete('/deleteAllUsers', userController.deleteAllUsers)

// Ruta para actualizar una propiedad específica de un usuario por su ID
router.put('/:id/updateProperty', userController.updateUserProperty);



module.exports = router;
