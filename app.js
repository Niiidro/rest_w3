import rest from "./router.js";
import express from "express";
import db from "./db.js"

const app = express();
const port = 3000;

const mongoose = db.database()

rest.setup(app, port, mongoose)


