import express from "express";
import users from "./Models/user.model.js";

const app = express();
const port = 3000;

//Gibt alle Personen aus
app.get("/", (req, res) => {});
//Gibt eine Person mit der jeweiligen ID aus
app.get("/:id", (req, res) => {
  const id = req.params.id;
});
//Erstelle eine Person
app.post("/", (req, res) => {
  const body = req.body;
});
//Überschreibt eine Person
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const method = "put";
});
//Aktualisert eine Person
app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const method = "patch";
});
//Löscht eine Person
app.delete("/:id", (req, res) => {
  const id = req.params.id;
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}.`);
});
