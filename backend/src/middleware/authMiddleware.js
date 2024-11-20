import jwt from "jsonwebtoken";
import prismaClient from "../lib/prismaClient.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "cfpagl secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "cfpagl secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await prismaClient.managers.findUnique({
          where: { manager_id: decodedToken.id },
        });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//export { requireAuth, checkUser };
