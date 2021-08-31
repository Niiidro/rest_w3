import express from "express";
import users from "./Models/user.model.js"

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}.`);
});
