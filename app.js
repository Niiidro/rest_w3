import rest from "./router.js";
import express from "express";
import bodyParser from "body-parser";
import users from "./users.js";
import mongoose from "mongoose";
import User from "./Model/User.js"

const app = express();
const port = 3000;

rest.setup(app)

async function database() {
  await mongoose.connect("mongodb://localhost:27017/db");
}
