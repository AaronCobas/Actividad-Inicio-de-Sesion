import knex from "knex";

export default class containerSQL{
    constructor(config,table){
        this.knex=knex(config)
        this.table = table
    }

    async getById(id){
        try{
            return this.knex.select("*").from(this.table).where("id",id)
        }catch(error){
            console.log(error)
        }
    }
    async getAll(){
        try{
            return this.knex.select("*").from(this.table)
        }catch(error){
            console.log(error)
        }
    }

    async addProduct(product){
        try{
            return this.knex.insert(product).into(this.table)
        }catch(error){
            console.log(error)
        }
    }

    async updateProduct(product,id){
        try{
            return this.knex.from(this.table).where("id",id).update(product)
        }catch{
            console.log(error)
        }
    }

    async deleteProduct(id){
        try{
            return this.knex.delete().from(this.table).where("id",id)
        }catch{
            console.log(error)
        }
    }
}