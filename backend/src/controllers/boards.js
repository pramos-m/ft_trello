import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("boards");
const listCollection = db.collection("lists");
const taskCollection = db.collection("tasks");

const controller = {
  // Obtener todos los boards con su información básica por usuario
  async getBoardsByUser(userId) {
    const boards = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    const boardsWithRefs = await Promise.all(
      boards.map(async (board) => {
        const lists = await listCollection
          .find({ boardId: board._id })
          .project({ _id: 1 })
          .toArray();
        
        const listsIds = lists.map(list => list._id);
        const tasks = await taskCollection
          .find({ listId: { $in: listsIds } })
          .project({ _id: 1 })
          .toArray();

        const taskIds = tasks.map(task => task._id);
        const labels = await labelCollection
          .find({ taskId: { $in: taskIds } })
          .project({ _id: 1 })
          .toArray();

        return {
          _id: board._id.toString(),
          name: board.name,
          backgroundColor: board.color,
          favorite: board.favorite,
          recent: ((new Date() - board.lastView) / (1000 * 60 * 60 * 24)) <= 15,
          lists: lists.map(list => list._id.toString()),
          tasks: tasks.map(task => task._id.toString()),
          labels: labels.map(label => label._id.toString())
        };
      })
    );

    return boardsWithRefs;
  },

  // Obtener toda la información de un board
  async getBoardById(id) {
    const board = await collection.findOne({ _id: new ObjectId(id) });
    if (!board) {
      throw new Error("Board not found");
    }

    const lists = await listCollection
      .find({ boardId: board._id })
      .toArray();

    const listsIds = lists.map(list => list._id);
    
    const tasks = await taskCollection
      .find({ listId: { $in: listsIds } })
      .toArray();

    const taskIds = tasks.map(task => task._id);

    const labels = await labelCollection
      .find({ taskId: { $in: taskIds } })
      .toArray();

    const formattedLists = lists.map(list => ({
      id: list._id.toString(),
      title: list.name,
      tasks: tasks
        .filter(task => task.listId.equals(list._id))
        .map(task => task._id.toString())
    }));

    const formattedTasks = tasks.map(task => ({
      id: task._id.toString(),
      title: task.name,
      labels: labels
        .filter(label => label.taskId.equals(task._id))
        .map(label => label._id.toString())
    }));

    const formattedLabels = labels.map(label => ({
      id: label._id.toString(),
      title: label.name,
      color: label.color
    }));

    return {
      id: board._id.toString(),
      backgroundColor: board.color,
      name: board.name,
      favorite: board.favorite,
      lists: formattedLists,
      tasks: formattedTasks,
      labels: formattedLabels
    };
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
    const board = await collection.findOne({ _id: new ObjectId(id) }, { projection: { lastView: 1 } });
    if (!board) throw new Error("Board not found");
    const daysDifference = (new Date() - board.lastView) / (1000 * 60 * 60 * 24);
    return daysDifference <= 15; // Considera reciente si fue creado en los últimos 15 días
  },

  async createBoard(data) {
    if (!ObjectId.isValid(data.userId)) {
      throw new Error("Invalid userId format");
    }
  
    const newBoard = {
      // _id: new ObjectId(),
      name: data.name,
      color: "#F1F4FF",
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