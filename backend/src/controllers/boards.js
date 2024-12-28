import db from "../db/connection.js";

const collection = db.collection("boards");

const	controller = {
	async getAll() {
		return collection.find({}).toArray();
	}
}
