const express = require("express");
const router = express.Router();

const db = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  db.get()
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database"
      });
    });
});

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  db.get(projectId)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: "No project with that ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error getting the project from database"
      });
    });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  const newproject = { name, description };
  if (!name || !description) {
    res.status(400).json({ error: "provide all fields" });
  } else {
    db.insert(newproject)
      .then(project => {
        res.json(project);
      })
      .catch(err => {
        res.status(500).json({ error: "Error posing project" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const projectId = req.params.id;
  db.remove(projectId)
    .then(project => {
      if (project) {
        res.json({ message: "deleted project" });
      } else {
        res.status(404).json({ error: "No project with that ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error getting the project from database"
      });
    });
});

router.put("/:id", (req, res) => {
  const projectId = req.params.id;
  const updateproject = req.body;
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ error: "provide all fields" });
  } else {
    db.update(projectId, updateproject)
      .then(project => {
        res.json(project);
      })
      .catch(err => {
        res.status(500).json({ error: "Error updating project" });
      });
  }
});

module.exports = router;
