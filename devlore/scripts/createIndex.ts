import "dotenv/config";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);

const createIndex = async () => {
  await client.connect();
  const db = client.db();

  await db.collection("user").createIndex({ username: 1 }, { unique: true });

  console.log("Index created");
  await client.close();
};

createIndex();
