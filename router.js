import users from "./users.js";
import express from "express";
import bodyParser from "body-parser";
import user from "./Model/user.js";

function setup(app, port, mongoose) {
  app.use(express.json());
  app.listen(port, () => {
    mongoose;
    console.log(`App listening at http://localhost:${port}.`);
  });

  //Gibt alle Personen aus
  app.get("/", async (req, res) => {
    try {
      res.status(200).send(await user.find());
    } catch (error) {
      res.status(404).send("No Users found");
    }
  });

  //Gibt eine Person mit der jeweiligen ID aus
  app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const ret = await user.findById(id);
      res.status(200).send(ret);
    } catch (error) {
      res.status(404).send("No User found with this ID");
    }
  });

  //Erstelle eine Person
  app.post("/", async (req, res) => {
    const body = req.body;
    try {
      const ret = await user.create(body);
      res.status(201).send(ret);
    } catch (error) {
      res.status(204).send("Hesch öppis falsch gmacht");
    }
  });

  //Überschreibt eine Person
  app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const method = "put";
    const body = req.body;
    // nur prüfung auf leeren Body nicht auf ungültige
    try {
      const ret = await user.findByIdAndUpdate({ id }, { body });

      res.status(201).send(ret);
    } catch (error) {
      res.status(200).send(error);
    }
    /* if (JSON.stringify(body) === "{}") {
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
    }*/
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
}
// Export der funktionen
export default {
  setup,
};
