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

module.exports = router;
