const Activity = require('../models/UserActivity'); 
const mongoose = require('mongoose')
const User = require('../models/User')

const userActivityController = {
  addActivity: async (req, res) => {
    try {
        const { userId, date, distance, duration, tokensEarned } = req.body;

        // Verifica que los campos requeridos estén presentes
        // if (!userId || !distance || !duration || !tokensEarned) {
        //     return res.status(400).json({ message: "Campos requeridos faltantes" });
        // }

        // Crea la nueva actividad
        const newActivity = new Activity({
            userId: new mongoose.Types.ObjectId(userId),
            date: new Date(date).toLocaleString(), // Formatea la fecha y hora
            distance,
            duration,
            tokensEarned,
        });

        // Guarda la nueva actividad
        const savedActivity = await newActivity.save();

        // Actualiza el usuario con la nueva actividad
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { activities: { date, distance, duration } } },
            { new: true }
        );

        res.status(201).json({ activity: savedActivity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
  },


  getAllActivities: async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  },

  
};


module.exports = userActivityController;
