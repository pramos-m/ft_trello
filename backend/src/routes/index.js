import express from "express";
import passport from 'passport';
import { isAuthenticated } from '../middleware/auth.js';
import { ObjectId } from "mongodb";
import db from '../db/connection.js';
import boardsRouter from './board.js';
import tasksRouter from './tasks.js';
import listsRouter from './lists.js';

const router = express.Router();

// TMP: Ruta para crear un nuevo usuario
const usersCollection = db.collection('users');

router.post('/users', async (req, res) => {
  const { _id, email } = req.body;

  if (!_id || !email) {
    return res.status(400).json({ error: 'El _id y el email son requeridos' });
  }

  try {
    const newUser = {
      _id: new ObjectId(_id),
      email
    };

    const result = await usersCollection.insertOne(newUser);
    if (result.insertedCount === 0) {
      throw new Error('Error al crear el usuario');
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rutas de boards
router.use('/boards', boardsRouter);

// Rutas de tasks
router.use('/tasks', tasksRouter);

// Rutas de lists
router.use('/lists', listsRouter);

// Rutas de autenticación
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: "/",
    failureRedirect: '/login' 
  })
);

// Ruta para verificar usuario actual
router.get('/current-user', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  res.json(req.user);
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

router.get('/', (req, res) => {
  res.send({ message: "Hello from Express!" });
});

export default router;
