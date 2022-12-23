import { json, Router, text} from "express";
import {createHash, validatePassword} from "../utils.js";
import __dirname from "../utils.js";
import userModel from "../Managers/mLoginUserManager.js";
import passport from "passport";
import initializePassport from "../config/passport.config.js";

const router = Router()

router.get("/register",(req,res)=>{
    res.render("register")
})
router.get("/failedregister",(req,res)=>{
    res.render("failedRegister")
})

router.post("/register",passport.authenticate("register",{failureRedirect:"/failedregister"}), async(req,res)=>{
    const user = req.user;
    res.send({status:"success",payload:user._id})
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/failedlogin",(req,res)=>{
    res.render("failedLogin")
})

router.post("/login",passport.authenticate("login"),async(req,res)=>{
    req.session.user = {
        user: req.user.user,
        email: req.user.email
    }
    res.redirect("/profile")
})

router.get("/profile",async(req,res)=>{
    const userInfo = req.session.user
    res.render("profile",{user:userInfo})
})

router.get("/logout",async(req,res)=>{
    req.session.destroy(err =>{
        if(!err) res.redirect("/login")
        else res.send({status:"error",body:err})
    })
})

export default router