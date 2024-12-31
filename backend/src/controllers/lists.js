import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("lists");

const controller = {
  // Cambiar el nombre de una lista
  async changeName(id, newName) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: newName } }
    );
    if (result.matchedCount === 0) throw new Error("List not found");
    return result.modifiedCount > 0;
  },

  // Cambiar la descripción de una lista
  async changeDescription(id, newDescription) {
    if (newDescription.length > 383) throw new Error("Description too long");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { description: newDescription } }
    );
    if (result.matchedCount === 0) throw new Error("List not found");
    return result.modifiedCount > 0;
  },

  // Cambiar el índice de una lista
  async changeIndex(id, newIndex) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { index: newIndex } }
    );
    if (result.matchedCount === 0) throw new Error("List not found");
    return result.modifiedCount > 0;
  },
};

export default controller;
