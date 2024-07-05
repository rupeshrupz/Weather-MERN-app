import { Router } from "express";
import  {AddFavourite, AuthLogin, AuthLogout, AuthRegister, AuthToken, DeleteFavourite, GetFavourite}  from "../controllers/AuthController.js";
import { isAuth } from "../middlewares/auth.js";
const router = Router()

router.post("/register", AuthRegister);
router.post("/login", AuthLogin);
router.post("/logout",isAuth,AuthLogout)
router.post("/favorites", isAuth,AddFavourite)
router.get("/favorites", isAuth,GetFavourite)
router.delete("/favorites", isAuth,DeleteFavourite)


export default router;