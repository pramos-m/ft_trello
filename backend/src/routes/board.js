import express from "express";
import controller from "../controllers/boards.js";

const router = express.Router();

// Ruta para obtener todos los boards del usuario autenticado
router.get("/me", async (req, res) => {
  try {
    const userId = req.user._id;
    const boards = await controller.getBoardsByUser(userId);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener todos los boards de un usuario
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.user._id;
    const boards = await controller.getBoardsByUser(userId);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener los detalles de todos los boards de un usuario
router.get("/user/:userId/details", async (req, res) => {
  try {
    const userId = req.user._id;
    const boardsWithDetails = await controller.getBoardsWithDetails(userId);
    res.status(200).json(boardsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener los detalles del board por nombre
/*router.get('/board/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const boardDetails = await controller.getBoardByName(name);
    res.status(200).json(boardDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
*/

// Ruta para obtener los detalles del board por id
router.get('/board/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const boardDetails = await controller.getBoardById(id);
    res.status(200).json(boardDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Ruta para marcar un board como favorito
router.patch("/:id/favorite", async (req, res) => {
  try {
    const id = req.params.id;
    await controller.addFavorite(id);
    res.status(200).json({ message: "Board marked as favorite" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para quitar un board como favorito
router.patch("/:id/unfavorite", async (req, res) => {
  try {
    const id = req.params.id;
    await controller.removeFavorite(id);
    res.status(200).json({ message: "Board unmarked as favorite" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
