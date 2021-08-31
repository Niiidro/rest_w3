import express from "express";
import bodyParser from "body-parser";
import users from "./users.js";

const app = express();
const port = 3000;

app.use();

//Gibt alle Personen aus
app.get("/", (req, res) => {
  res.status(200).send(users.getAllUsers());
});
//Gibt eine Person mit der jeweiligen ID aus
app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).send(users.getUserById(id));
});
//Erstelle eine Person
app.post("/", (req, res) => {
  const body = req.body;
  console.dir(body);
  res.status(200).send(users.createUser(body));
});
//Überschreibt eine Person
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const method = "put";
  const body = req.body;
});
//Aktualisert eine Person
app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const method = "patch";
  const body = req.body;
});
//Löscht eine Person
app.delete("/:id", (req, res) => {
  const id = req.params.id;
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}.`);
});
