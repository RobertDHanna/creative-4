/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { makeID } = require("./utils");

mongoose.connect("mongodb://localhost:27017/smog", {
  useNewUrlParser: true
});

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const userSchema = new mongoose.Schema({
  id: String,
  slug: String
});

const blogSchema = new mongoose.Schema({
  id: String,
  userId: String,
  title: String,
  delta: Object,
  html: String,
  createdAt: Date
});

const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

app.post("/user", async (req, res) => {
  const { slug } = req.body;
  const user = new User({
    id: makeID(),
    slug
  });
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/blog", async (req, res) => {
  const { userId, title, delta, html } = req.body;
  const blog = new Blog({
    id: makeID(),
    userId,
    title,
    delta,
    html,
    createdAt: new Date()
  });
  try {
    await blog.save();
    res.send(blog);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server listening on port 3000!"));
