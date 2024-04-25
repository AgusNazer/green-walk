const express = require('express');
const router = express.Router();
const userActivityController = require('../controllers/userActivityController');


router.post('/add', userActivityController.addActivity);
router.get('/', userActivityController.getAllActivities);



module.exports = router;