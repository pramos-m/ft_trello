import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("tasks");

const controller = {
  // Cambiar el nombre de una tarea
  async changeName(id, newName) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: newName } }
    );
    if (result.matchedCount === 0) throw new Error("Task not found");
    return result.modifiedCount > 0;
  },

  // Cambiar la descripción de una tarea
  async changeDescription(id, newDescription) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { description: newDescription } }
    );
    if (result.matchedCount === 0) throw new Error("Task not found");
    return result.modifiedCount > 0;
  },

  // Cambiar la prioridad de una tarea
  async changePriority(id, newPriority) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { priority: newPriority } }
    );
    if (result.matchedCount === 0) throw new Error("Task not found");
    return result.modifiedCount > 0;
  },

  // Cambiar el esfuerzo de una tarea
  async changeEffort(id, newEffort) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { effort: newEffort } }
    );
    if (result.matchedCount === 0) throw new Error("Task not found");
    return result.modifiedCount > 0;
  },

  // Cambiar el índice de una tarea
  async changeIndex(id, newIndex) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { index: newIndex } }
    );
    if (result.matchedCount === 0) throw new Error("Task not found");
    return result.modifiedCount > 0;
  },
};

export default controller;
