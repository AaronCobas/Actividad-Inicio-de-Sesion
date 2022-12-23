import mongoose, { startSession } from "mongoose";
const connection =  mongoose.connect("mongodb+srv://CoderUser:123@codercluster.qyce1yj.mongodb.net/ChatsDB?retryWrites=true&w=majority", err=>{
    if(err) console.log(err);
    else console.log("Connected to Mongo on mChatManager.js")
})



const schema = new mongoose.Schema({
id:{
    type:String,
},
messages:{
    type:Array,
}
})

const chatModel = mongoose.model("chats",schema)

// await chatModel.create({id:"mensajes",messages:[]})
export default class mChatManager{

    addChat = async(message)=>{
        await chatModel.updateOne({id:"mensajes"}, {$push:{messages:{message}}})
    }

    allChat = async()=>{
        const chats = await chatModel.find({id:"mensajes"})
        return chats
    }
}