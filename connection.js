//import MongoClient
import { MongoClient } from "mongodb";
//import .env
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.ATLAS_URI;

// Create a MongoClient
const client = new MongoClient(uri);

//Create a connection variable to hold the database connection and leave it unassigned
let connection;

try {
  //Connect to client and store in the connection variable
  connection = await client.connect();
} catch (error) {
  console.log("Error : ", error);
}

//connect to countries-app database store in constant db
const db = connection.db("countries-app");

export default db;
