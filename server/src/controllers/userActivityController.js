const Activity = require('../models/UserActivity'); 
const mongoose = require('mongoose')

const userActivityController = {
  addActivity: async (req, res) => {
  
    try {
      const { userId, date, distance, duration, tokensEarned } = req.body;
      const newActivity = new Activity({
        userId,
        date,
        distance,
        duration,
        tokensEarned,
      });

      const savedActivity = await newActivity.save();
      res.status(201).json(savedActivity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  },
  
};


module.exports = userActivityController;
