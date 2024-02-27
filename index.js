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

app.use("/routes/users", usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
