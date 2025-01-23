import express from "express";
import controller from "../controllers/tasks.js";

const router = express.Router();

// Crear una nueva tarea
router.post("/", async (req, res) => {
  const { listId, name, description, priority, effort, index } = req.body;

  if (!listId || !name /*|| !description*/)
    return res.status(400).send("listId and name are required");

  try {
    const newTask = await controller.createTask(
      listId,
      name,
      description,
      priority,
      effort,
      index
    );
    res.status(201).json(newTask);
  } catch (err) {
		console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const success = await controller.deleteTask(req.params.id);
    res.status(200).json({ success });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// Ruta para mover tarea dentro de la misma columna
router.patch("/:id/move-within-column", async (req, res) => {
  const { newIndex } = req.body;
  try {
    const task = await controller.moveTaskWithinColumn(req.params.id, newIndex);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mover tarea a otra columna
router.patch("/:id/move-to-another-column", async (req, res) => {
  const { newListId, newIndex } = req.body;

  // Verificar que los parámetros requeridos estén presentes
  if (!newListId || newIndex === undefined) {
    return res.status(400).json({ error: "newListId and newIndex are required" });
  }

  try {
    // Llamar al controlador para mover la tarea
    const task = await controller.moveTaskToAnotherColumn(
      req.params.id,
      newListId,
      newIndex
    );

    // Si la tarea no se encuentra, devolver un error 404
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Responder con la tarea actualizada
    res.status(200).json(task);
  } catch (err) {
    // Manejo de errores genéricos del servidor
    res.status(500).json({ error: err.message });
  }
});

export default router;
