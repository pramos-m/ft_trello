import express from "express";
import controller from "../controllers/lists.js";

const router = express.Router();

// Cambiar el nombre y/o la descripción de una lista
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  if (!name && !description) return res.status(400).send("Name or description is required");
  try {
    const success = await controller.updateList(req.params.id, { name, description });
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  // const { name, description } = req.body;
	// console.log(name, description);
  // if (!name && !description) return res.status(400).send("Name or description is required");
  try {
    const success = await controller.updateList(req.params.id, req.body);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cambiar el índice de una lista y ajustar los índices afectados
router.patch("/:id/index", async (req, res) => {
  const { newIndex } = req.body;
  if (newIndex === undefined || typeof newIndex !== "number")
    return res.status(400).send("New index must be a number and is required");
  try {
    const success = await controller.changeIndex(req.params.id, newIndex);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obtener todas las listas de un tablero
router.get("/board/:boardId", async (req, res) => {
  try {
    const lists = await controller.getListsByBoard(req.params.boardId);
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Eliminar una lista
router.delete("/:id", async (req, res) => {
  try {
    const success = await controller.deleteList(req.params.id);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear una nueva lista
router.post("/", async (req, res) => {
  const { name, boardId, description, index } = req.body;
  if (!name || !boardId) return res.status(400).send("Name and boardId are required");
  try {
    const listId = await controller.createList({ name, boardId, description, index });
    res.status(201).send({ listId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
