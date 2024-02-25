const express = require("express");
const usersRouter = require("./routes/users.js");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
