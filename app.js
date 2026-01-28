import express from "express";
const app = express();

import { ObjectId } from "mongodb";
import db from "./connection.js";

// Find all
app.get("/countries", async (req, res, next) => {
  try {
    console.log(await db.collection("countries").find({}).limit(10).toArray());
    res.send("MongoDB Documents Found!");
  } catch (error) {
    next(error);
  }
});

// Find one
app.get("/countries/:name", async (req, res, next) => {
  try {
    const collection = await db.collection("countries");
    let countryName = req.params.name;
    const result = await collection.findOne({ "name.common": countryName });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
