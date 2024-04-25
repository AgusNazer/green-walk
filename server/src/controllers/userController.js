const User = require("../models/User");

//  post controller crear usuario
const userController = {
  async register(req, res) {
    try {
      // Crear una instancia del modelo User con los datos recibidos
      const newUser = new User(req.body);

      // Buscar si ya existe un usuario con el mismo email
      const existingUser = await User.findOne({ email: newUser.email });
      if (existingUser) {
        return res.status(400).json({ message: "This email already exists." });
      }

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      // Excluir datos sensibles antes de enviar la respuesta
      const {
        password,
        resetPasswordToken,
        resetPasswordExpires,
        ...userWithoutPassword
      } = savedUser.toObject();
      res.status(201).json({ userId: savedUser._id, ...userWithoutSensitiveInfo });
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        return res.status(400).json(errors);
      }
      if (error.name === "MongoServerError") {
        return res.status(500).json({ message: "Error connection with Db." });
      }
      return res
        .status(500)
        .json({ message: "Something went wrong registering a user" });
    }
  },

  // Función updateProfile
  async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      const { username, country, objective, carbonFootprint, photoUrl } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username,
            country,
            objective,
            carbonFootprint,
            photoUrl,
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const {
        password,
        resetPasswordToken,
        resetPasswordExpires,
        ...userWithoutSensitiveInfo
      } = updatedUser.toObject();
      res.status(200).json(userWithoutSensitiveInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating use r profile" });
    }
  },

  // save user de firabse
  async saveUser(req, res) {
    try {
      const { uid, email } = req.body;
      // const username = email.split("@")[0]; // Genera un username a partir del email

      // Validación simple del email
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      // Verifica si el usuario ya existe para evitar duplicados
      const existingUser = await User.findOne({ uid: uid });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
      }

      // Crear y guardar el nuevo usuario
      const newUser = new User({
        uid: uid,
        email: email,
        username: username,
        password: "", // Como es con Firebase, podemos optar por no almacenar nada aca
      });
      const savedUser = await newUser.save();

      // Excluir datos sensibles antes de enviar la respuesta
      const { password, ...userWithoutPassword } = savedUser.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Failed to save user", error);
      res.status(500).json({ message: "Error saving user" });
    }
  },

  //get users db
  async getAllUsers(req, res) {
    try {
        const users = await User.find({});
        const usersWithFilteredFields = users.map(user => {
            const { password, resetPasswordToken, resetPasswordExpires, ...userWithoutSensitiveInfo } = user.toObject();
            return userWithoutSensitiveInfo;
        });
        res.status(200).json(usersWithFilteredFields);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users from database" });
    }
  },
  // get user by id
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires'); // Excluye campos sensibles
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  },

   // ACtualizar una propiedad del user
  async updateUserProperty(req, res) {
    try {
      const userId = req.params.id;
      const { propertyName, propertyValue } = req.body;

      // Verificar si la propiedad a actualizar existe en el modelo User
      if (!(propertyName in User.schema.paths)) {
        return res.status(400).json({ message: "Invalid property name" });
      }

      // Actualizar la propiedad del usuario por su ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { [propertyName]: propertyValue } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Excluir datos sensibles antes de enviar la respuesta
      const { password, resetPasswordToken, resetPasswordExpires, ...userWithoutSensitiveInfo } = updatedUser.toObject();
      res.status(200).json(userWithoutSensitiveInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user property" });
    }
  },
  //Delete all users de mongo
  async deleteAllUsers(req, res) {
    try {
        await User.deleteMany({});  
        res.status(200).json({ message: "All users have been deleted successfully." });
    } catch (error) {
        console.error("Error deleting all users:", error);
        res.status(500).json({ message: "Error deleting all users" });
    }
},
// Función para obtener el ID de MongoDB por email o Firebase UID
async  getMongoUserIdByEmail(req, res) {
  try {
    // Normaliza el email para evitar problemas de case sensitivity
    const email = req.params.email.toLowerCase();
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
        // Si se encuentra el usuario, devolver el ID de MongoDB
        res.status(200).json({ userId: user._id.toString() });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
},



}

module.exports = userController;
