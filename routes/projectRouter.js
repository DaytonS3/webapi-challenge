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

module.exports = router;
