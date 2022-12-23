import passport from "passport";
import local from "passport-local";
import userModel from "../Managers/mLoginUserManager.js";
import { createHash, validatePassword } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = ()=>{
    passport.use("register",new localStrategy({passReqToCallback:true,usernameField:"email"},async(req,email,password,done)=>{
        try{
            const user = req.body.user
            if(!user) return done(null, false,{message:"Valores Incompletos"})
            const exists = await userModel.findOne({email})
            if(exists) return done(null,false,{message:"User already exists"})
            const hashedPassword = await createHash(password)
            const fullUser = {
                email,
                user,
                password: hashedPassword
            }
            const result = await userModel.create(fullUser);
            done(null, result)
        }catch(error){
            done(error)
        }
    }))

    passport.use("login", new localStrategy({usernameField:"email"},async(email,password,done)=>{
try{
    if(!email||!password) return done(null,false,{message:"Incomplete Values"})
    const user = await userModel.findOne({email});
    if(!user) return done(null,false,{message:"User not found"})
    const isValidPassword = await validatePassword(user,password)
    if(!isValidPassword) return done(null,false,{message:"Incorrect password"})
    done(null,user)
}catch(error){
    done(error)
}
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await userModel.findOne({_id:id})
        return done(null,result)
    })
}

export default initializePassport