const User = require('../models/User');

// usamos el controlador como un objeto
const userController = {
  async register(req, res) {
    try {
      const newUser = new User(req.body);

      const existingUser = await User.findOne({ email: newUser.email });
      if (existingUser) {
        return res.status(400).json({ message: 'This email already exists.' });
      }
     
      const savedUser = await newUser.save();
      const { password, resetPasswordToken, resetPasswordExpires, ...userWithoutPassword } = savedUser.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        let errors = {};
        Object.keys(error.errors).forEach(key => {
          errors[key] = error.errors[key].message;
        });
        return res.status(400).json(errors);
      }
      if (error.name === 'MongoServerError') {
        return res.status(500).json({ message: 'Error connection with Db.' });
      }
      return res.status(500).json({ message: 'Something went wrong registering a user' });
    }
  },

  //Update profile
  async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      const { country, objective, carbonFootprint, photoUrl } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          country,
          objective,
          carbonFootprint,
          photoUrl
        }
      }, { new: true, runValidators: true });
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const { password, resetPasswordToken, resetPasswordExpires, ...userWithoutSensitiveInfo } = updatedUser.toObject();
      res.status(200).json(userWithoutSensitiveInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user profile' });
    }
  },
};


module.exports = userController;
