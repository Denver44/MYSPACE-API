import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = `${process.env.SECRET_KEY}`;
const expires = `${process.env.EXPIRES_IN}`;

const checkUserExist = async (email) => User.findOne({ email });

const userJWTToken = (email, id) =>
  jwt.sign({ email, id }, secret, {
    expiresIn: expires,
  });

export { checkUserExist, userJWTToken };