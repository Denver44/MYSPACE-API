import express from "express";
import posts from "./posts.js";
import user from "./user.js";

const routes = express.Router();

routes.get("/", (_, res) => res.send("Welcome to Myspace API"));

routes.use("/posts", posts);
routes.use("/user", user);

export default routes;
