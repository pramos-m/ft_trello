import express from "express";

import controller from "../controllers/boards.js";

const router = express.Router();

// Ruta para obtener todos los boards del usuario autenticado
router.get("/me", async (req, res) => {
  try {
    const boards = await controller.getBoardsByUser(req.user._id);
    res.status(200).json(boards);
  } catch (error) {
		console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener los detalles de todos los boards de un usuario
router.get("/me/detailed", async (req, res) => {
  try {
    const boardsWithDetails = await controller.getBoardsWithDetails(req.user._id);
    res.status(200).json(boardsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener los detalles del board por id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const boardDetails = await controller.getBoardById(id);
    res.status(200).json(boardDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Ruta para crear un nuevo board
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newBoard = await controller.createBoard({...data, userId: req.user._id});
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para editar un board
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const success = await controller.updateBoard(id, data);
    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para editar un board
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const success = await controller.updateBoard(id, data);
    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para eliminar un board
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await controller.deleteBoard(id);
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
