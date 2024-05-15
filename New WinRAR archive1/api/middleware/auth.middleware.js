import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = (rolesArray = []) => {
  if (!rolesArray) rolesArray = [];

  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        isSuccess: false,
        message: "Authentication invalid!",
      });
    }

    const token = authHeader.split(" ")[1];

    let payload = null;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          isSuccess: false,
          message: "Your session is expired!",
        });
      }

      return res.status(401).json({
        isSuccess: false,
        message: "You're unauthorized to access this resource!",
      });
    }

    let user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        isSuccess: false,
        message: "You're unauthorized to access this resource!",
      });
    }

    if (!rolesArray.includes(payload.role)) {
      return res.status(403).json({
        isSuccess: false,
        message: "You're unauthorized to access this resource!",
      });
    }

    req.auth = payload;

    return next();
  };
};

export default { authorize };
