import express from "express";
import controller from "../controllers/boards.js";

const router = express.Router();

// Obtener todos los boards del usuario
router.get("/user/:userId", async (req, res) => {
  controller
    .getByUser(req.params.userId)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err.message));
});

// Obtener la cantidad de listas asignadas a un board
router.get("/:id/lists/count", async (req, res) => {
  controller
    .getListCount(req.params.id)
    .then((result) => res.status(200).send({ count: result }))
    .catch((err) => res.status(500).send(err.message));
});

// Obtener la cantidad de tareas asignadas a un board
router.get("/:id/tasks/count", async (req, res) => {
  controller
    .getTaskCount(req.params.id)
    .then((result) => res.status(200).send({ count: result }))
    .catch((err) => res.status(500).send(err.message));
});

// Verificar si un board es favorito
router.get("/:id/favorite", async (req, res) => {
  controller
    .isFavorite(req.params.id)
    .then((result) => res.status(200).send({ isFavorite: result }))
    .catch((err) => res.status(500).send(err.message));
});

// Marcar un board como favorito
router.post("/:id/favorite", async (req, res) => {
  controller
    .addFavorite(req.params.id)
    .then(() => res.status(200).send({ message: "Board marked as favorite" }))
    .catch((err) => res.status(500).send(err.message));
});

// Quitar un board como favorito
router.delete("/:id/favorite", async (req, res) => {
  controller
    .removeFavorite(req.params.id)
    .then(() => res.status(200).send({ message: "Board unmarked as favorite" }))
    .catch((err) => res.status(500).send(err.message));
});

// Verificar si un board es reciente
router.get("/:id/recent", async (req, res) => {
  controller
    .isRecent(req.params.id)
    .then((result) => res.status(200).send({ isRecent: result }))
    .catch((err) => res.status(500).send(err.message));
});

export default router;
