import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("boards");
const listCollection = db.collection("lists");
const taskCollection = db.collection("tasks");

const controller = {
  // Obtener todos los boards del usuario
  async getByUser(userId) {
    return collection.find({ userId: new ObjectId(userId) }).toArray();
  },

  // Obtener la cantidad de listas asignadas a un board
  async getListCount(boardId) {
    return listCollection.countDocuments({ boardId: new ObjectId(boardId) });
  },

  // Obtener la cantidad de tareas asignadas a un board
  async getTaskCount(boardId) {
    const lists = await listCollection.find({ boardId: new ObjectId(boardId) }).toArray();
    const listIds = lists.map((list) => list._id);
    return taskCollection.countDocuments({ listId: { $in: listIds } });
  },

  // Verificar si un board es favorito
  async isFavorite(id) {
    const board = await collection.findOne({ _id: new ObjectId(id) }, { projection: { favorite: 1 } });
    if (!board) throw new Error("Board not found");
    return board.favorite;
  },

  // Marcar un board como favorito
  async addFavorite(id) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { favorite: true } }
    );
    if (result.modifiedCount === 0) throw new Error("Failed to add favorite");
    return true;
  },

  // Quitar un board como favorito
  async removeFavorite(id) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { favorite: false } }
    );
    if (result.modifiedCount === 0) throw new Error("Failed to remove favorite");
    return true;
  },

  // Verificar si un board es reciente
  async isRecent(id) {
    const board = await collection.findOne({ _id: new ObjectId(id) }, { projection: { date: 1 } });
    if (!board) throw new Error("Board not found");
    const daysDifference = (new Date() - board.date) / (1000 * 60 * 60 * 24);
    return daysDifference <= 15; // Considera reciente si fue creado en los últimos 15 días
  },

  // Crear un nuevo board
  async createBoard(data) {
    const newBoard = {
      ...data,
      favorite: data.favorite || false,
      date: new Date(),
    };
    const result = await collection.insertOne(newBoard);
    if (result.insertedCount === 0) throw new Error("Failed to create board");
    return result.ops[0];
  },

  // Editar un board
  async updateBoard(id, data) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (result.matchedCount === 0) throw new Error("Board not found");
    return result.modifiedCount > 0;
  },
};

export default controller;
