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

  // más métodos al controlador
};


module.exports = userController;
