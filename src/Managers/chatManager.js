import fs from "fs";
import path from "path";
import __dirname from "../utils.js";
export default class ChatManager{
    constructor(){
        this.path = `${__dirname}/chatLog.json`;
        this.init();
    }

    init = async() =>{
        if(!fs.existsSync(this.path)) await fs.promises.writeFile(this.path,JSON.stringify([]))
    }

    readChat = async() =>{
        let data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data)
    }

    addChat = async(data) =>{
        let chats = await this.readChat();
        if(chats.length===0) data.id = 1;
        else data.id = chats[chats.length-1].id +1;
        chats.push(data);
        await fs.promises.writeFile(this.path, JSON.stringify(chats,null,"\t"))
    }

}