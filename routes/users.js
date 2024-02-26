const express = require("express");
const router = express.Router();
const db = require("../database/database.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const activeThreshold = 30 * 24 * 60 * 1000;

router.get("/users", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

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

router.delete("/inactive-users", (req, res) => {
  const currentTime = Date.now();

  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const inactiveUsers = rows.filter((user) => {
      const lastActive = new Date(user.lastActive).getTime(); // Convert to ms
      return currentTime - lastActive > activeThreshold;
    });

    if (!inactiveUsers.length) {
      return res.status(404).json({ message: "No inactive users found" });
    }

    inactiveUsers.forEach((user) => {
      db.run("DELETE FROM users WHERE id = ?", [user], function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`Deleted user ${user}`);
        }
      });
    });

    res
      .status(200)
      .json({ message: `${inactiveUsers.length} users deleted successfully` });
  });
});

module.exports = router;
