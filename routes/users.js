const express = require("express");
const router = express.Router();
const db = require("../database/database.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(row);
  });
});

router.post("/", (req, res) => {
  const { name, email, password, userType } = req.body;
  db.run(
    "INSERT INTO users (name, email, password, userType) VALUES (?, ?, ?, ?)",
    [name, email, password, userType],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ id: this.lastID, name, email, password, userType });
    },
  );
});

router.put("/", (req, res) => {
  const id = req.params;
  const { name, email, password, userType } = req.body;
  db.run(
    "UPDATE users SET name = ?, email = ?, password = ?, userType = ? WHERE id = ?",
    [name, email, password, userType, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id, name, email, password, userType });
    },
  );
});

router.get("/", function (res) {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
