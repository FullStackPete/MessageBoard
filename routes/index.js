const express = require("express");
require("dotenv").config();
const router = express.Router();
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://fspete:${process.env.DB_PASSWORD}@messageboard.65jnimb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db("messageboardDb");
const userCollection = database.collection("userCollection");
const date = new Date();
const addedDate = date.toUTCString();


let messages = [];
async function readDocuments() {
  try {
    await client.connect();
    messages = await database.collection("userCollection").find().toArray();
  } finally {
    await client.close();
  }
}

async function run(req) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("You successfully connected to MongoDB!");

    const doc = {
      user: req.body.userText,
      text: req.body.messageText,
      added: addedDate,
    };
    const result = await userCollection.insertOne(doc);
    console.log(`Doc inserted succesfully with the _id ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
//sample messages:

/* GET home page. */
router.get("/", function (req, res, next) {
  readDocuments().catch(console.dir);
  res.render("index", { title: "Mini Message Board", messages: messages });
});
router.get("/new", (req, res, next) => {
  res.render("form", {});
});
router.post("/new", (req, res) => {
  run(req).catch(console.dir);
  messages.push({
    user: req.body.userText,
    text: req.body.messageText,
    added: addedDate,
  });

  res.redirect("/");
});

module.exports = router;
