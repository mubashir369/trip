import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
export const verifyAdmin = (req, res, next) => {
  console.log("verify...", req);
  verifyToken(req, res, next, () => {
    console.log("user is", req.user);
    if (req.user.isAdmin) {
      console.log("Success");
      next();
    } else {
      console.log("You Are Not admin");
      next(createError(403, "You are not authorized!"));
    }
  });
};
export const verifyUser = (req, res, next) => {
  if (req.headers?.authorization === undefined) {
    res.status(500).json({ error:true ,message: "Token Not Provide" });
  }
  const token = req.headers?.authorization.split(" ")[1];
  
  if (!token) {
    res.status(500).json({ error:true ,message: "Token Not Provide"});
  } else {
    jwt.verify(token, process.env.JWT, (err, decode) => {
      if (err) {
        res.status(500).json({ error:true,message: "Authentication failed" });
      } else {
        console.log("verification success");
        next();
      }
    });
  }
};
