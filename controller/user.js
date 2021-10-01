import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { checkUserExist, userJWTToken } from "../utils/helper.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    //1.Check user exist or not if not then return user doesn't exit
    //2.Check the password is matching or not
    //3.If not match password then return

    const userValid = await checkUserExist(email);

    if (!userValid)
      return res.status(404).json({ message: "user doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userValid.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials." });

    const token = userJWTToken(userValid?.email, userValid?._id);

    res.status(201).json({
      userInfo: {
        id: userValid._id,
        name: userValid.name,
        email: userValid.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const oldUser = await checkUserExist(email);

    if (oldUser)
      return res.status(400).json({ message: "user already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = userJWTToken(result?.email, result?._id);

    res.status(200).json({
      userInfo: { id: result._id, name: result.name, email: result.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
