import mongoose, { startSession } from "mongoose";
const connection =  mongoose.connect("mongodb+srv://CoderUser:123@codercluster.qyce1yj.mongodb.net/ChatsDB?retryWrites=true&w=majority", err=>{
    if(err) console.log(err);
    else console.log("Connected to Mongo on mLoginUser.js")
})

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("Users",schema)

export default userModel