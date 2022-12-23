import knex from "knex";

const sqliteOptions = {
    client:"sqlite3",
    connection:{
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
const db = knex(sqliteOptions)

try{
    let exist = await db.schema.hasTable("products")
    if(!exist){
        await db.schema.createTable("products", table =>{
            table.increments("id").primary()
            table.string("title", 30).notNullable()
            table.float("price").notNullable()
            table.string("thumbnail",1024)
            console.log("products table created")
        })
    }
}catch(error){
console.log(error);
}
try{
    let exist = await db.schema.hasTable("messages")
    if(!exist){
        await db.schema.createTable("messages", table =>{
            table.primary("id").increments()
            table.string("user", 30)
            table.string("message")
            console.log("messages table created")
        })
    }
}catch(error){
console.log(error);
}

export default sqliteOptions;