const express = require("express");
const cors = require("cors");

const projectRouter = require("./routes/projectRouter");
const actionRouter = require("./routes/actionRouter");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(`Server Is Running on port 5000`);
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
