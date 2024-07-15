const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const port = 3000;
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
app.use(bodyParser.json());
app.use(cors());

const dbName = "passop";
client.connect();
console.log("Connected successfully to server");

app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});
app.post("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const password = req.body;
    console.log(password);
    const findResult = await collection.insertOne(password);
    // res.json(req.body);
    res.send({ success: true, result: findResult });
});
app.delete("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const password = req.body;
    console.log('i need to delete this '+password);
    const findResult = await collection.deleteOne(password);
    // res.json(req.body);
    res.send({ success: true, result: findResult });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
