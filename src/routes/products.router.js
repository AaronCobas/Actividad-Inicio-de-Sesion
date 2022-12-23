import { json, Router} from "express";
import productsManager from "../Managers/productManager.js"
import uploader from "../services/upload.js";
import { Server } from "socket.io";
import __dirname from "../utils.js";
import containerSQL from "../Container/containerSQL.js";
import sqliteOptions from "../dbs/knex.js";
import { generateProduct } from "../Managers/productFaker.js";
const router = Router()
const productSQL = new containerSQL(sqliteOptions, "products")
const productsService = new productsManager();

router.get("/test",async(req,res)=>{
    let productos = []
    for(let i=0;i<5;i++){
        productos.push(generateProduct());
    }
    res.render("productosFaker",
    {
        productos
    }
    )
});
router.post("/",uploader.single("thumbnail"),async (req,res)=>{
    let product = req.body;
    product.price = parseInt(product.price);
    const parsedProduct = JSON.parse(JSON.stringify(product))
    const result = await productSQL.addProduct(parsedProduct);
    res.send({status:"success", message:result});
})
router.get("/",async(req,res)=>{
    let result = await productSQL.getAll();
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    let result = await productsService.getById(id)
    res.send(result)
})
router.put("/:id",async(req,res)=>{
    let {id} = req.params;
    let product = req.body;
    await productsService.putFile(product, id)
    res.send("Producto actualizado")
})
router.delete("/:id",async(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
let result = await productsService.deleteById(id)
    res.send(result)
})
export default router