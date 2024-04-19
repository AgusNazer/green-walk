const User = require('../models/User');

//  post controller crear usuario
const userController = {
  async register(req, res) {
    try {
      // Crear una instancia del modelo User con los datos recibidos
      const newUser = new User(req.body);

      // Buscar si ya existe un usuario con el mismo email
      const existingUser = await User.findOne({ email: newUser.email });
      if (existingUser) {
        return res.status(400).json({ message: 'This email already exists.' });
      }
     
      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      // Excluir datos sensibles antes de enviar la respuesta
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

  // Función updateProfile
  async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      const { country, objective, carbonFootprint, photoUrl } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          country,
          objective,
          carbonFootprint,
          photoUrl,
          
        }
      }, { new: true, runValidators: true });
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const { password, resetPasswordToken, resetPasswordExpires, ...userWithoutSensitiveInfo } = updatedUser.toObject();
      res.status(200).json(userWithoutSensitiveInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating use r profile' });
    }
  },

  // save user de firabse
  async saveUser(req, res) {
    try {
        const { uid, email } = req.body;
        const username = email.split('@')[0]; // Genera un username a partir del email

        // Verifica si el usuario ya existe para evitar duplicados
        const existingUser = await User.findOne({ uid: uid });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Crear y guardar el nuevo usuario
        const newUser = new User({
            uid: uid,
            email: email,
            username: username,
            password: '' // Como es con Firebase, puedes optar por no almacenar contraseña
        });
        const savedUser = await newUser.save();
        

        // Excluir datos sensibles antes de enviar la respuesta
        const { password, ...userWithoutPassword } = savedUser.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Failed to save user', error);
        res.status(500).json({ message: 'Error saving user' });
    }
}


   
};

module.exports = userController;
