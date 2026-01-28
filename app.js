import express from 'express';
const app = express();

import { ObjectId } from 'mongodb';
import db from './connection.js';

// Find all 
app.get('/profiles', async (req, res, next) => {
  try {
    const collection = await db.collection('profiles');
    const results = await collection.find({})
    .toArray();

    res.status(200).json(results);
  } catch(error){
    next(error);
  }
}); 

// Find one
app.get('/profiles/:id', async (req, res, next) => {
  try {
    const collection = await db.collection('profiles');
    const query = {_id: ObjectId.createFromHexString(req.params.id)};
    const result = await collection.findOne(query);
    
    res.status(200).json(result);
  } catch(error){
    next(error);
  }
});

// Insert One
app.post('/profiles', async (req, res, next) => {
  try{
    const collection = await db.collection('profiles');
    const results = await collection.insertOne({
      "profile_id": 101,
      "first_name": "Santiago",
      "last_name": "Gomez",
      "company": "Innovación Global",
      "position": "CTO",
      "industry": "Technology",
      "location": "Barcelona, Spain",
      "education": "Universidad de Barcelona",
      "connections": 850,
      "followers": 1350,
      "posts_per_week": 4
    });
    const inserted = await collection.findOne({_id: results.insertedId});
    res.status(201).json(inserted);
  } catch(error){
    next(error);
  }
});

// Update one
app.patch('/profiles/:id', async (req, res, next) => {
  try {
    const collection = await db.collection('profiles');
    const query = {_id: ObjectId.createFromHexString(req.params.id)};
    const updates = {$set: {first_name: "Vicky", company: "123456 Company"}}
    const result = await collection.updateOne(query, updates);
  
    const updated = await collection.findOne(query);
    res.status(200).json(updated);
  } catch(error){
    next(error);
  }
});

// Delete one 
app.delete('/profiles/:id', async (req, res, next) => {});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});