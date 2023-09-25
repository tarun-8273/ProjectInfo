const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const ProjectDetails = require("./models/ProjectDetails.js");
const cookieParser = require("cookie-parser");
const { json } = require("express");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45edfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

//console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

//for testing
app.get("/test", (req, res) => {
  res.json("test ok");
});

//for registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

//for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

//for profile section
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
  //res.json({ token });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//for project_details
app.post("/project_details", (req, res) => {
  const { token } = req.cookies;
  const { title, technologies, frontend, backend, databases, infrastructure } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const projectDetailDoc = await ProjectDetails.create({
      owner: userData.id,
      title,
      technologies,
      frontend,
      backend,
      databases,
      infrastructure,
    });
    res.json(projectDetailDoc);
  });
});

app.get("/user-project_details", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await ProjectDetails.find({ owner: id }));
  });
});

app.get("/project_details/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await ProjectDetails.findById(id));
});

app.put("/project_details", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    technologies,
    frontend,
    backend,
    databases,
    infrastructure,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const projectDoc = await ProjectDetails.findById(id);
    //console.log(userData.id === projectDoc.owner.toString());
    if (userData.id === projectDoc.owner.toString()) {
      projectDoc.set({
        title,
        technologies,
        frontend,
        backend,
        databases,
        infrastructure,
      });
      await projectDoc.save();
      res.json("ok");
    }
  });
});

app.get("/project_details", async (req, res) => {
  res.json(await ProjectDetails.find());
});

app.listen(4000);
