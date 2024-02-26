const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users.js");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request method: ${req.method}`, `Request URL: ${req.url}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  next();
});

app.use("/users", usersRouter);

app.use("/users", (req, res) => {
  if (req.method === "GET") {
    res.json({ message: "You've made a GET request to /users" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
