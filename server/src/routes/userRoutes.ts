import express from 'express';
import User from '../models/User'; 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json(errors);
    }
    return res.status(500).json({ error: 'Algo salió mal al registrar el usuario' });
  }
});
router.get('/test', (req, res) => {
    res.send('Test endpoint response');
  });


export default router;
