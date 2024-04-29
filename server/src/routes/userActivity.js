const express = require('express');
const router = express.Router();
const userActivityController = require('../controllers/userActivityController');


router.post('/add', userActivityController.addActivity);
router.get('/', userActivityController.getAllActivities);
router.get('/user/:userId', userActivityController.getUserActivities);
router.get('/last/:userId', userActivityController.getLastActivities);


module.exports = router;