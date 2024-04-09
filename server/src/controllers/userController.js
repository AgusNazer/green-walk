const User = require('../models/User');

// Función de registro de usuarios
exports.register = async (req, res) => {
  try {
    // Crea una instancia del usuario con los datos recibidos
    // No es necesario modificar esto para los nuevos campos si tienen valores predeterminados o son opcionales
    const newUser = new User(req.body);

    // Verifica si ya existe un usuario con el mismo email
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email already exists.' });
    }
   
    // Guarda el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Eliminar la contraseña del objeto antes de retornarlo
    // Esto garantiza que la contraseña no se envíe de vuelta en la respuesta
    const { password, resetPasswordToken, resetPasswordExpires, ...userWithoutPassword } = savedUser.toObject();

    // Devuelve el nuevo usuario sin la contraseña
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
    // Maneja errores de conexión con la base de datos
    if (error.name === 'MongoServerError') {
      return res.status(500).json({ message: 'Error connection with Db.' });
    }
    return res.status(500).json({ message: 'Something went wrong registering a user' });
  }
};
