import express from "express";
import { ObjectId } from "mongodb";

import db from '../db/connection.js';

const usersCollection = db.collection('users');
const router = express.Router();

router.post('/', async (req, res) => {
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


export default router;
