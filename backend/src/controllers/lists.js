import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("lists");

const controller = {
  // Cambiar el nombre y/o la descripción de una lista
  async updateList(id, updateData) {
    // const updateData = {};
		// console.log(name, description)
  //   updateData.name = name;
  //   updateData.description = description;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) throw new Error("List not found");
    return result.modifiedCount > 0;
  },

  // Cambiar el índice de una lista y ajustar los índices afectados
  async changeIndex(id, newIndex) {
    const list = await collection.findOne({ _id: new ObjectId(id) });
    if (!list) throw new Error("List not found");

    const { index: currentIndex, boardId } = list;

    if (currentIndex === newIndex) return true; // No se requiere ningún cambio

    // Determinar el rango afectado
    const updateQuery = currentIndex < newIndex
      ? { boardId, index: { $gt: currentIndex, $lte: newIndex } }
      : { boardId, index: { $gte: newIndex, $lt: currentIndex } };

    const updateOperation = currentIndex < newIndex
      ? { $inc: { index: -1 } }
      : { $inc: { index: 1 } };

    // Actualizar los índices afectados
    await collection.updateMany(updateQuery, updateOperation);

    // Establecer el nuevo índice para la lista
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { index: newIndex } }
    );

    return result.modifiedCount > 0;
  },

  // Obtener todas las listas de un tablero
  async getListsByBoard(boardId) {
    return await collection.find({ boardId: new ObjectId(boardId) }).sort({ index: 1 }).toArray();
  },

  // Eliminar una lista por su ID y ajustar los índices
  async deleteList(id) {
    const list = await collection.findOne({ _id: new ObjectId(id) });
    if (!list) throw new Error("List not found");

    const { boardId, index: deletedIndex } = list;

    // Eliminar la lista
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Failed to delete list");

    // Ajustar los índices de las listas restantes
    await collection.updateMany(
      { boardId: new ObjectId(boardId), index: { $gt: deletedIndex } },
      { $inc: { index: -1 } }
    );

    return true;
  },

  // Crear una nueva lista
  async createList(data) {
    const { boardId, name, description = "", index } = data;

    // Ajustar índices si se proporciona uno
    if (index !== undefined) {
      await collection.updateMany(
        { boardId: new ObjectId(boardId), index: { $gte: index } },
        { $inc: { index: 1 } }
      );
    }

    const result = await collection.insertOne({
      boardId: new ObjectId(boardId),
      name,
      description: description || "",
      index: index ?? (await collection.countDocuments({ boardId: new ObjectId(boardId) })),
    });

    return result.insertedId;
  },
};

export default controller;
