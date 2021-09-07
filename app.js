import rest from "./router.js";
import express from "express";

const app = express();
const port = 3000;

rest.setup(app);
