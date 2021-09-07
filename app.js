import rest from "./router.js";
import express from "express";
import bodyParser from "body-parser";
import users from "./users.js";
import mongoose from "mongoose";
import User from "./Model/User.js"

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
  const ret = users.getUserById(id);
  if (ret == 404) {
    res.status(404).send("no User found with this ID");
  } else {
    res.status(200).send(ret);
  }
});

//Erstelle eine Person
app.post("/", (req, res) => {
  const body = req.body;
  if (JSON.stringify(body) === "{}") {
    res.status(204).send("Body is empty");
  } else {
    res.status(201).send(users.createUser(body));
  }
});

//Überschreibt eine Person
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const method = "put";
  const body = req.body;

  // nur prüfung auf leeren Body nicht auf ungültigen
  if (JSON.stringify(body) === "{}") {
    // prüfen ob Body leer ist
    res.status(204).send("Body is empty");
  } else {
    const ret = users.updateUser(id, body, method);
    if (ret == 404) {
      res.status(ret[0]).send(ret[1]);
    } else if (ret[0] == 204) {
      res.status(ret[0]).send(ret[1]);
    } else {
      res.status(201).send(ret);
    }
  }
});

//Aktualisert eine Person
app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const method = "patch";
  const body = req.body;

  if (JSON.stringify(body) === "{}") {
    res.status(204).send("Body is empty");
  } else {
    const ret = users.updateUser(id, body, method);
    if (ret[0] == 404) {
      res.status(ret[0]).send(ret[1]);
    } else if (ret[0] == 204) {
      res.status(ret[0]).send(ret[1]);
    } else {
      res.status(201).send(ret);
    }
  }
});

//Löscht eine Person
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const ret = users.deleteUser(id);
  if (ret == 404) {
    res.sendStatus(ret);
  } else {
    res.status(200).send(ret);
  }
});

async function database() {
  await mongoose.connect("mongodb://localhost:27017/db");
}
app.listen(port, () => {
  database()
  console.log(`App listening at http://localhost:${port}.`);
});
