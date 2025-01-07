import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("boards");
const listCollection = db.collection("lists");
const taskCollection = db.collection("tasks");

const controller = {

    // Obtener todos los boards del usuario con información básica
    async getBoardsByUser(userId) {
      const boards = await collection
        .find({ userId: new ObjectId(userId) })
        .project({ name: 1, color: 1, favorite: 1, date: 1 })
        .toArray();
  
      return boards.map((board) => ({
				id: board._id,
        name: board.name,
        color: board.color,
        favorite: board.favorite,
        recent: ((new Date() - board.date) / (1000 * 60 * 60 * 24)) <= 15,
				lists: 6,
				tasks: 30,
      }));
    },

  // Obtener detalles de un board por nombre
  /*async getBoardByName(name) {
    const board = await collection.findOne({ name });

    if (!board) {
      throw new Error("Board not found");
    }

    const lists = await listCollection
      .find({ boardId: board._id })
      .project({ name: 1, description: 1 })
      .toArray();

    const listsWithTasks = await Promise.all(
      lists.map(async (list) => {
        const tasks = await taskCollection
          .find({ listId: list._id })
          .project({ name: 1, description: 1 })
          .toArray();
        return { ...list, tasks };
      })
    );

    return {
      _id: board._id,
      name: board.name,
      color: board.color,
      favorite: board.favorite,
      lists: listsWithTasks,
    };
  },*/

  async getBoardById(id) {
    const board = await collection.findOne({ _id: new ObjectId(id) });
  
    if (!board) {
      throw new Error("Board not found");
    }
  
    const lists = await listCollection
      .find({ boardId: board._id })
      .project({ name: 1, description: 1 })
      .toArray();
  
    const listsWithTasks = await Promise.all(
      lists.map(async (list, listIndex) => {
        const tasks = await taskCollection
          .find({ listId: list._id })
          .project({ name: 1, description: 1 })
          .toArray();
  
        // Añadir índice a las tareas
        const tasksWithIndex = tasks.map((task, taskIndex) => ({
          index: taskIndex,
          ...task,
        }));
  
        // Retornar lista con índice e incluir tareas con índices
        return {
          index: listIndex,
          ...list,
          tasks: tasksWithIndex,
        };
      })
    );
  
    return {
      _id: board._id,
      name: board.name,
      color: board.color,
      favorite: board.favorite,
      lists: listsWithTasks,
    };
  },
  

    // Obtener detalles de todos los boards del usuario con detalles.
    async getBoardsWithDetails(userId) {
      const boards = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();
  
      const detailedBoards = await Promise.all(
        boards.map(async (board) => {
          const lists = await listCollection
            .find({ boardId: board._id })
            .project({ name: 1, description: 1 })
            .toArray();
  
          const listsWithTasks = await Promise.all(
            lists.map(async (list) => {
              const tasks = await taskCollection
                .find({ listId: list._id })
                .project({ name: 1, description: 1 })
                .toArray();
              return { ...list, tasks };
            })
          );
  
          return {
            _id: board._id,
            name: board.name,
            color: board.color,
            favorite: board.favorite,
            lists: listsWithTasks,
          };
        })
      );
  
      return detailedBoards;
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
    const board = await collection.findOne({ _id: ObjectId.createFromHexString(id) }, { projection: { date: 1 } });
    if (!board) throw new Error("Board not found");
    const daysDifference = (new Date() - board.date) / (1000 * 60 * 60 * 24);
    return daysDifference <= 15; // Considera reciente si fue creado en los últimos 15 días
  },

  async createBoard(data) {
    if (!ObjectId.isValid(data.userId)) {
      throw new Error("Invalid userId format");
    }
  
    const newBoard = {
      // _id: new ObjectId(),
      name: data.name,
      color: "#FF00FF",
      favorite: data.favorite || false,
      date: new Date(),
      userId: new ObjectId(data.userId),
    };
  
    try {
      const result = await collection.insertOne(newBoard);
      if (!result.insertedId) {
        throw new Error("Failed to create board");
      }
  
      // Opcional: Retornar el objeto recién creado directamente
      return newBoard;
  
      // Alternativamente: Buscar el objeto recién insertado en la colección
      // return await collection.findOne({ _id: result.insertedId });
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 121) {
        throw new Error("Document failed validation");
      }
      throw error;
    }
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

  // Eliminar un board
  async deleteBoard(id) {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) throw new Error("Board not found");
  return true;
},

};

export default controller;
