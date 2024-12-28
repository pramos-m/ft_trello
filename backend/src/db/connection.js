import { MongoClient } from "mongodb";

// import BoardSchema from "./models/Board.json" with { type: json };

const URI = process.env.DB_URI || "";
const client = new MongoClient(URI);

let	db;

try {
  await client.connect();
  db = await client.db("flowboard");

	db.command({ ping: 1 });
  console.log("You successfully connected to MongoDB!");

	// db.createCollection("boards", {
	// 	validator: {
	// 		$jsonSchema: BoardSchema
	// 	}
	// });
} catch (err) {
  console.error(err);
}

export default db;
