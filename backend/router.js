import express from 'express';
import account from './Model/account.js';
import ip from 'ip';
import jwt from 'jsonwebtoken';
import cors from 'cors';

function jwtChecker(req, res, next) {
  const bearerHeader = req.header('Authorization');
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  try {
    const decode = jwt.verify(bearerToken, 'secret');
    req.decoded = decode;
    next();
  } catch (e) {
    res.status(403).send('Unauthorized Token');
  }
}

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
};
function setup(app, port, mongoose) {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.listen(port, () => {
    mongoose;
    console.log(`App listening at http://localhost:${port}.`);
  });

  //Read all Acounts
  app.get('/', jwtChecker, async (req, res) => {
    try {
      res.status(200).send(await account.find());
    } catch (e) {
      res.status(404).send('No Accounts found');
    }
  });

  //Read one Account with the given ID
  app.get('/:id', jwtChecker, async (req, res) => {
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
    body.lastIP = ip.address();
    try {
      const ret = await account.create(body);
      res.status(201).send(ret);
    } catch (e) {
      res.status(406).send(e);
    }
  });

  //Overwrite one Account with the given ID
  app.put('/:id', jwtChecker, async (req, res) => {
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
  app.patch('/:id', jwtChecker, async (req, res) => {
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
  app.delete('/:id', jwtChecker, async (req, res) => {
    const id = req.params.id;
    try {
      const ret = await account.deleteOne({ _id: id });

      res.status(202).send('Account with the ID: ' + id + ' is deleted.');
    } catch (e) {
      res.status(409).send(e);
    }
  });

  app.post('/login', async (req, res) => {
    const ret = await account.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (ret !== null) {
      res.status(202).json({ authToken: jwt.sign({ id: ret.id }, 'secret') });
    }
    res.status(404).send();
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
