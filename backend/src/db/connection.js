import { MongoClient } from "mongodb";

import UserSchema from "../models/User.json" with { type: "json" };
import BoardSchema from "../models/Board.json" with { type: "json" };
import ListSchema from "../models/List.json" with { type: "json" };
import TaskSchema from "../models/Task.json" with { type: "json" };
import LabelSchema from "../models/Label.json" with { type: "json" };

const URI = process.env.DB_URI || "";
const client = new MongoClient(URI);

let	db;

try {
  await client.connect();
  db = await client.db("database");

	db.command({ ping: 1 });
  console.log("You successfully connected to MongoDB!");

	db.createCollection("users", {
		validator: {
			$jsonSchema: UserSchema
		}
	});

	db.createCollection("boards", {
		validator: {
			$jsonSchema: BoardSchema
		}
	});

	db.createCollection("lists", {
		validator: {
			$jsonSchema: ListSchema
		}
	});

	db.createCollection("tasks", {
		validator: {
			$jsonSchema: TaskSchema
		}
	});

	db.createCollection("labels", {
		validator: {
			$jsonSchema: LabelSchema
		}
	});
} catch (err) {
  console.error(err);
}

export default db;