import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI;
const dbName = "code_coreviewer_db";

const client = new MongoClient(url);

let dbConnection = null;

async function connectDb() {
  try {
    if (dbConnection) return dbConnection;
    await client.connect();
    console.log("Connected to DB😎");
    dbConnection = client.db(dbName);
    return dbConnection;
  } catch (error) {
    console.error("Connection to DB failed:", error);
    throw error;
  }
}

export async function getCollection(collectionName) {
  try {
    const db = await connectDb();
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Error getting collection:", error);
    throw error;
  }
}

export function toObjectId(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId: ", id);
  }
  return new ObjectId(id);
}
