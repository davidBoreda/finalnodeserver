const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("node:fs");
const app = express();

const apiRouter = require("./routes/api");

const router = express.Router();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiRouter);

// router.get("/", (req, res) => {
//   res.json({ msg: "msg from router - please try /api/" });
// });

// app.use("*", (req, res) => {
//   res.status(404).json({ msg: "page not found" });
// });

/* React */
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
