import prisma from "../database/db.config.js";
import vine ,{errors} from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const AuthRegister = async(req,res) =>{
    try {
        const body = req.body;
        const validator = vine.compile(registerSchema);
        const payload = await validator.validate(body);

        //   * Check if email exist
        const findUser = await prisma.users.findUnique({
          where: {
            email: payload.email,
          },
        });

        if (findUser) {
          return res.status(400).json({
            errors: {
              email: "Email already taken.please use another one.",
            },
          });
        }

        //   * Encrypt the password
        const salt = bcrypt.genSaltSync(10);
        payload.password = bcrypt.hashSync(payload.password, salt);

        const user = await prisma.users.create({
          data: payload,
        });
        return res.json({
          status: 200,
          message: "User created successfully",
          user,
        });
      } catch (error) {
        console.log("The error is", error);
        if (error instanceof errors.E_VALIDATION_ERROR) {
          // console.log(error.messages);
          return res.status(400).json({ errors: error.messages });
        } else {
          return res.status(500).json({
            status: 500,
            message: "Something went wrong.Please try again.",
          });
        }
    }
}


export const AuthLogin = async(req,res) =>{
  try {
    const body = req.body;
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(body);

    //   * Find user with email
    const findUser = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (findUser) {
      if (!bcrypt.compareSync(payload.password, findUser.password)) {
        return res.status(400).json({
          errors: {
            email: "Invalid Credentials.",
          },
        });
      }

      // * Issue token to user
      const user = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });



      return res.status(200).json({
        success:true,token:token,message:"login successful",user
      });
    }

    return res.status(400).json({
      errors: {
        email: "No user found with this email.",
      },
    });
  } catch (error) {
    console.log("The error is", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      // console.log(error.messages);
      return res.status(400).json({ errors: error.messages });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }
}

export const AuthToken = async(req,res,next) =>{
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  console.log('passed')
  if(token == null) {
   return res.status(400)
  }
  else{
    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
      if(err) return res.status(403)
        req.user = user
      next()
    });
  }
}

export const AuthLogout = async(req,res) => {
  try {
        if(req.headers && req.headers.authorization)
        {
          const token = req.headers.authorization.split(' ')[1];
          if(!token){
           return res.status(401).json({success:false,message:"authorization failed"})
          }
          res.send("ok")

        }
        else{
          console.log('no headers')
        }


    } catch (error) {
        console.log(error)
    }
}

export const AddFavourite = async(req,res)=>{
  try {
    const userId = parseInt(req.query.id)
    console.log(userId)
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });

    const {fav_weather} = req.body

    const updatedFavourites = [...user.favourite, fav_weather]

    const uniqueFavourites = Array.from(new Set(updatedFavourites));

    const fav = await prisma.users.update({
      where:{id:userId},
      data:{
        favourite:uniqueFavourites
      }
    })
    res.status(200).json({message:"updated",fav})
  } catch (error) {
    console.log(error)

  }
}

export const GetFavourite = async(req,res)=>{
  try {
    const userId = parseInt(req.query.id)
    console.log(userId)
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });
     if(user.favourite.length == 0){
      return res.status(200).json({message:"no favourite added"})
     }
    const fav = {
     favourite:user.favourite
    };

    return res.status(200).json({message:"got data",fav})
  } catch (error) {
    console.log(error)

  }
}


export const DeleteFavourite = async(req,res)=>{
  try {
    const userId = parseInt(req.query.id)
    const deleted_data = req.query.deleted_data
    console.log(deleted_data)
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });


    const updatedFavourites = user.favourite.filter(item => item !== deleted_data);
    const fav = await prisma.users.update({
      where:{id:userId},
      data:{
        favourite:updatedFavourites
      }
    })
    res.status(200).json({message:"deleted",fav})
  } catch (error) {
    console.log(error)

  }
}