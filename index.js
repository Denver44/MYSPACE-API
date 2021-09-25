import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.k04xt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // for images the size is fix

app.get("/", (_, res) => res.send("Welcome to Myspace API"));
app.use("/posts", postRoutes); // it going to reach as /posts
app.use("/user", userRoutes); // it going to reach as /users

// DB SETUP
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`listening the port at  ${PORT}`))
  )
  .catch((e) => {
    console.log(e);
  });
