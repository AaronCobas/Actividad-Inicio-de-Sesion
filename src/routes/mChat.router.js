import { json, Router, text} from "express";
import __dirname from "../utils.js";
import mChatManager from "../Managers/mChatManager.js";
import { normalize, schema} from "normalizr"

const router = Router()

const mChatService = new mChatManager

router.get("/mongoChat", async(req,res)=>{
        res.render("mongoChat")
})

router.post("/api/messages", async(req,res)=>{
    const {id, name, last_name, age, alias, avatar, text} = req.body;
    if(!id||!name||!last_name||!age||!alias||!avatar||!text) return res.status(400).send({status:"error",error:"Incomplete values"})
    const chatToInsert ={
        author:{
            id:id,
            name: name,
            last_name: last_name,
            age: parseInt(age),
            alias: alias,
            avatar:avatar
        },
        text: text
    }
    const addedChat = mChatService.addChat(chatToInsert)
    res.send({status:"success",payload:addedChat,message:"Message added successfully"})
})

router.get("/api/messages/normalizr", async(req,res)=>{
    const messagesMongo = await mChatService.allChat()
    const messages = messagesMongo.map(m=>{
        const newMessage = {
            id:m.id,
            messages: m.messages,
            _id:m._id.valueOf()
        }
        return newMessage
    })
    const finalMessage = messages[0]
    const user = new schema.Entity("users")
    const message = new schema.Entity("message", {
        author:user
    })
    const messagesSchema = new schema.Entity("messages",{
        messages: [message]
    })

    const normalizedMessages = normalize(messages,messagesSchema);
    res.send({payload:normalizedMessages})
})

export default router