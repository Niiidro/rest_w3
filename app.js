import express from "express";
import bodyParser from "body-parser";
import users from "./users.js";

const app = express();
const port = 3000;

app.use(express.json());

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
  res.status(201).send(users.createUser(body));
});

//Überschreibt eine Person
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const method = "put";
  const body = req.body;
  res.status(201).send(users.updateUser(id,body,method));
});

//Aktualisert eine Person
app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const method = "patch";
  const body = req.body;
  res.status(201).send(users.updateUser(id,body,method));
});

//Löscht eine Person
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).send(users.deleteUser(id))
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}.`);
});
