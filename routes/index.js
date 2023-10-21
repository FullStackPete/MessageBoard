var express = require("express");
var router = express.Router();

const date = new Date();
const addedDate = date.toUTCString();

//sample messages:
const messages = [
  {
    text: "Hello!",
    user: "Alex",
    added: addedDate,
  },
  {
    text: "Hiiiyaaa!",
    user: "Yoshiko",
    added: addedDate,
  },
  {
    text: "Hello World!",
    user: "Nebula",
    added: addedDate,
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages: messages });
});
router.get("/new", (req, res, next) => {
  res.render("form", {});
});
router.post("/new", (req, res) => {
  messages.push({user:req.body.userText,
    text:req.body.messageText,added: addedDate});
  res.redirect('/')
});

module.exports = router;
