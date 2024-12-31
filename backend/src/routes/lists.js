import express from "express";
import controller from "../controllers/lists.js";

const router = express.Router();

// Cambiar el nombre de una lista
router.patch("/:id/name", async (req, res) => {
  const { newName } = req.body;
  if (!newName) return res.status(400).send("New name is required");
  try {
    const success = await controller.changeName(req.params.id, newName);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cambiar la descripción de una lista
router.patch("/:id/description", async (req, res) => {
  const { newDescription } = req.body;
  if (!newDescription) return res.status(400).send("New description is required");
  try {
    const success = await controller.changeDescription(req.params.id, newDescription);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cambiar el índice de una lista
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

export default router;
