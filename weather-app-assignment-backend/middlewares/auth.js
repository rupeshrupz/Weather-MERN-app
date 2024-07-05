import jwt from "jsonwebtoken";
import prisma from "../database/db.config.js";

export const isAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);


        //   * Find user with email

        const user = await prisma.users.findUnique({
          where: {
            email: decode.email,
          },
        });
        console.log(user)

        if (!user) {
          return res.json({ success: false, message: 'unauthorized access!' });
        }

        req.user = user;

        next();
      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          return res.json({ success: false, message: 'unauthorized access!' });
        }
        if (error.name === 'TokenExpiredError') {
          return res.json({
            success: false,
            message: 'sesson expired try sign in!',
          });
        }

        res.res.json({ success: false, message: 'Internal server error!' });
      }
    } else {
        console.log(req.headers)
      res.json({ success: false, message: 'unauthorized access!' });
    }
  };