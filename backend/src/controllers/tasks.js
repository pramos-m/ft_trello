import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("tasks");

const controller = {
  // Crear una nueva tarea en una lista específica
  async createTask(listId, name, description = null, priority = "low", effort = "low") {
    // Obtener el índice más alto actual en la lista y agregar 1
    const maxIndexTask = await collection.find({ listId: new ObjectId(listId) })
      .sort({ index: -1 })
      .limit(1)
      .toArray();
    const newIndex = maxIndexTask.length > 0 ? maxIndexTask[0].index + 1 : 0;

    const newTask = {
      listId: new ObjectId(listId),
      name,
      description,
      priority,
      effort,
      index: newIndex,
    };
		// console.log("\n\n\n");
		// console.log(newTask);
		// console.log("\n\n\n");
    const result = await collection.insertOne(newTask);

    return { ...newTask, id: result.insertedId };
  },
  
  // Eliminar una tarea y ajustar índices
  async deleteTask(id) {
    const task = await collection.findOne({ _id: new ObjectId(id) });
    if (!task) throw new Error("Task not found");
  
    // Ajustar índices de las tareas restantes
    await collection.updateMany(
      { listId: task.listId, index: { $gt: task.index } },
      { $inc: { index: -1 } }
    );
  
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Failed to delete task");
    return true;
  },
  
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

  async updateTask(id, updateData) {

    console.log(updateData);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
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

  // Mover tarea dentro de la misma columna
  async moveTaskWithinColumn(taskId, newIndex) {
    const task = await collection.findOne({ _id: new ObjectId(taskId) });
    if (!task) throw new Error("Task not found");

    const { listId, index: currentIndex } = task;

    if (currentIndex === newIndex) return true;

    const query = currentIndex < newIndex
      ? { listId, index: { $gt: currentIndex, $lte: newIndex } }
      : { listId, index: { $gte: newIndex, $lt: currentIndex } };

    const update = currentIndex < newIndex
      ? { $inc: { index: -1 } }
      : { $inc: { index: 1 } };

    await collection.updateMany(query, update);

    task.index = newIndex;
    await collection.updateOne({ _id: task._id }, { $set: { index: newIndex } });

    return task;
  },

  async moveTaskToAnotherColumn(taskId, newListId, newIndex) {
    const task = await collection.findOne({ _id: new ObjectId(taskId) });
    if (!task) throw new Error("Task not found");
  
    const { listId: currentListId, index: currentIndex } = task;
  
    // Ajustar índices en la lista origen
    await collection.updateMany(
      { listId: currentListId, index: { $gt: currentIndex } },
      { $inc: { index: -1 } }
    );
  
    // Ajustar índices en la lista destino
    await collection.updateMany(
      { listId: new ObjectId(newListId), index: { $gte: newIndex } },
      { $inc: { index: 1 } }
    );
  
    // Actualizar la tarea con la nueva lista y posición
    const updatedTask = {
      ...task,
      listId: new ObjectId(newListId),
      index: newIndex,
    };
    await collection.updateOne(
      { _id: task._id },
      { $set: { listId: updatedTask.listId, index: updatedTask.index } }
    );
  
    return updatedTask;  
  }
};

export default controller;
