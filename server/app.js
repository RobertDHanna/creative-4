/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { makeID } = require("./utils");

mongoose.connect("mongodb://localhost:27017/smog", {
  useNewUrlParser: true
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const userSchema = new mongoose.Schema({
  customId: String,
  slug: String
});

const blogSchema = new mongoose.Schema({
  userId: String,
  title: String,
  delta: Object,
  html: String,
  createdAt: Date
});

blogSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

blogSchema.set("toJSON", {
  virtuals: true
});

const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

// User endpoints
app.post("/api/user", async (req, res) => {
  const { slug } = req.body;
  const userWithSlugExists = await User.find({ slug });
  if (userWithSlugExists.length > 0) {
    res.status(400).send({ error: "slug already exists" });
    return;
  }
  const user = new User({
    customId: makeID(),
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

// Blog endpoints

app.get("/api/blog/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let userBlogs = await Blog.find({ userId });
    if (userBlogs.length === 0) {
      const user = await User.findOne({ slug: userId });
      if (user) {
        userBlogs = await Blog.find({ userId: user.customId });
      }
    }
    res.send(
      userBlogs.map(blog => {
        return { ...blog._doc, userId: null };
      })
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/api/blog", async (req, res) => {
  const { id, title, delta, html } = req.body;
  try {
    const blog = await Blog.findOne({ _id: id });
    blog.title = title;
    blog.delta = delta;
    blog.html = html;
    blog.createdAt = new Date();
    await blog.save();
    res.send(blog);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/blog", async (req, res) => {
  const { userId, title, delta, html } = req.body;
  const blog = new Blog({
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

app.delete("/api/blog", async (req, res) => {
  const { id } = req.body;
  const blog = await Blog.findOne({ _id: id });
  try {
    blog.delete();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server listening on port 3000!"));
