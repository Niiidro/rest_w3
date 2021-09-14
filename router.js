import express from 'express';
import account from './Model/account.js';
import ip from 'ip';

function setup(app, port, mongoose) {
  app.use(express.json());
  app.listen(port, () => {
    mongoose;
    console.log(`App listening at http://localhost:${port}.`);
  });

  //Read all Acounts
  app.get('/', async (req, res) => {
    try {
      res.status(200).send(await account.find());
    } catch (e) {
      res.status(404).send('No Accounts found');
    }
  });

  //Read one Account with the given ID
  app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const ret = await account.findById(id);
      res.status(200).send(ret);
    } catch (error) {
      res.status(404).send('No Account found with this ID');
    }
  });

  //Create Account
  app.post('/', async (req, res) => {
    const body = req.body;
    body.lastIP = ip.address()
    try {
      const ret = await account.create(body);
      res.status(201).send(ret);
    } catch (e) {
      res.status(406).send(e);
    }
  });

  app.post('/login', async (req, res) => {
    const body = req.body;
    const ret = await account.findOne({ name: body.name });
    try {
      if (ret != null && ret.password == body.password) {
        res.status(200).send(ret);
      } else {
        res.status(404).send('Login fehlerhaft');
      }
    } catch (e) {
      res.status(204).send(e);
    }
  });

  //Overwrite one Account with the given ID
  app.put('/:id', async (req, res) => {
    var id = req.params.id;
    const body = req.body;
    body.lastIP = ip.address();

    // nur prüfung auf leeren Body nicht auf ungültige
    try {
      const ret = await account.findByIdAndUpdate(id, body, {
        new: true,
        overwrite: true,
      });
      console.log(ret);
      res.status(201).send(ret);
    } catch (e) {
      res.status(409).send(e);
    }
  });

  //Update one Account with the given ID
  app.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.lastIP = ip.address();

    // nur prüfung auf leeren Body nicht auf ungültige
    try {
      const ret = await account.findByIdAndUpdate(id, body, { new: true });
      console.log(ret);
      res.status(201).send(ret);
    } catch (e) {
      res.status(409).send(e);
    }
  });

  //Delete one Account with the given ID
  app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const ret = await account.deleteOne({ _id: id });
      
      res.status(202).send("Account with the ID: " + id + " is deleted.");
    } catch (e) {
      res.status(409).send(e);
    }
  });

  app.post('/signIn', async (req, res) => {
    res.status(200).send();
  });
  app.post('/recover', async (req, res) => {
    res.status(200).send();
  });
  app.post('/activate', async (req, res) => {
    res.status(200).send();
  });
}
// Export der funktionen
export default {
  setup,
};
