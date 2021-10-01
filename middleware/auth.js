import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length > 100;

    token && isCustomAuth
      ? (req.userId = jwt.verify(token, "test").id)
      : (req.userId = token);

    next();
  } catch (err) {
    console.log("err ", err);
  }
};

export default requireAuth;
