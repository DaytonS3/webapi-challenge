const express = require("express");
const router = express.Router();

const db = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  db.get()
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      });
    });
});

router.get("/:id", (req, res) => {
  const actionId = req.params.id;
  db.get(actionId)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ error: "No action with that ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error getting the action from database"
      });
    });
});

router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  const newAction = { project_id, description, notes };
  if (!project_id || !description || !notes) {
    res.status(400).json({ error: "provide all fields" });
  } else {
    db.insert(newAction)
      .then(action => {
        res.json(action);
      })
      .catch(err => {
        res.status(500).json({ error: "Error posing action" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const actionId = req.params.id;
  db.remove(actionId)
    .then(action => {
      if (action) {
        res.json({ message: "deleted action" });
      } else {
        res.status(404).json({ error: "No action with that ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error getting the action from database"
      });
    });
});

router.put("/:id", (req, res) => {
  const actionId = req.params.id;
  const updateAction = req.body;
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({ error: "provide all fields" });
  } else {
    db.update(actionId, updateAction)
      .then(action => {
        res.json(action);
      })
      .catch(err => {
        res.status(500).json({ error: "Error updating action" });
      });
  }
});

module.exports = router;
