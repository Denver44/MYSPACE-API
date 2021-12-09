"use strict";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // for images the size is fix

export default app;
