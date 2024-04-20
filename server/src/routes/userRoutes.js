const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

// registro de usuario
router.post('/register', userController.register);

router.post('/saveUser', userController.saveUser);


// inicio de sesion ( JWT )
// router.post('/login', userController.login);

// update user
router.put('/profile/:id', userController.updateProfile);

// // change password
// router.put('/change-password', userController.changePassword);

// // recovery password
// router.post('/forgot-password', userController.forgotPassword);

// // reset password
// router.post('/reset-password', userController.resetPassword);

//get user
router.get('/getAllUsers', userController.getAllUsers);

// info profile
// router.get('/profile', userController.getProfile);

// // delete user
// router.delete('/delete-account', userController.deleteAccount);

//



module.exports = router;
