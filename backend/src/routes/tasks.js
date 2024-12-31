import express from "express";
import controller from "../controllers/tasks.js";

const router = express.Router();

// Cambiar el nombre de una tarea
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

// Cambiar la descripción de una tarea
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

// Cambiar la prioridad de una tarea
router.patch("/:id/priority", async (req, res) => {
  const { newPriority } = req.body;
  const validPriorities = ["low", "mid", "high"];
  if (!newPriority || !validPriorities.includes(newPriority))
    return res.status(400).send("New priority must be 'low', 'mid', or 'high'");
  try {
    const success = await controller.changePriority(req.params.id, newPriority);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cambiar el esfuerzo de una tarea
router.patch("/:id/effort", async (req, res) => {
  const { newEffort } = req.body;
  const validEfforts = ["low", "mid", "high"];
  if (!newEffort || !validEfforts.includes(newEffort))
    return res.status(400).send("New effort must be 'low', 'mid', or 'high'");
  try {
    const success = await controller.changeEffort(req.params.id, newEffort);
    res.status(200).send({ success });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cambiar el índice de una tarea
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
