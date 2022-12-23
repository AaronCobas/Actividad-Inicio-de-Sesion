import fs from "fs";
import path from "path";
import __dirname from "../utils.js";
const pathToFile = __dirname+"/products.json";
const success = {
    status: "success",
    message: "Product created successfully"
    }
class Manager {
    save = async (product) => {
    if(!product.title || !product.price || !product.thumbnail){
    return {
    status: "error",
    message: "Missing requires fields",
    }
} try {
    if(fs.existsSync(pathToFile)){
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let products = JSON.parse(data);
    let id = products.length +1;
    product.id = id;
    products.push(product);
    await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
    return success
    } else {
    product.id = 1;
    await fs.promises.writeFile (
    pathToFile,
    JSON.stringify([product], null, 2)
    );
    return success;
    }
    } catch (error){
    return{
    status: "error",
    message: error.message,
    };
    }
    };
    getAll = async () => {
    try {
    if(fs.existsSync(pathToFile)){
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let products = JSON.parse(data);
    return{
    status: "success",
    products: products,
    };
    }else{
    return{
    status:"error",
    message:"No products found",
    }
    }
    }catch (error){
    return{
    status: "error",
    message: error.message,
    };
    }
    }
    getById = async(id) =>{
    if(!id) {
    return{
    status:"error",
    message: "ID is required",
    };
    }
    if (fs.existsSync(pathToFile)) {
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let products = JSON.parse(data);
    let product = products.find((product) => product.id == id);
    if(product){
    return{
    status:"success",
    product:product,
    };
    }else {
    return {
    status: "error",
    message: "Product not found",
    };
}
}else {
    return {
    status: "error",
    message: "Product not found"
    }
    }
    }
    deleteById = async (id) =>{
    if(!id) {
    return{
    status:"error",
    message: "ID is required",
    };
    }
    if (fs.existsSync(pathToFile)) {
    let data = await fs.promises.readFile(pathToFile, "utf-8")
    let products = JSON.parse(data)
    let newProducts = products.filter((product) => product.id != id)
    await fs.promises.writeFile(
    pathToFile,
    JSON.stringify(newProducts, null, 2)
    );
    return{
    status: "success",
    message:"Product deleted successfully",
    }
    } else{
    return{
    status: "error",
    message: "No prodcuts found",
    }
    }
    }
    putFile = async (product, id) =>{
        const allProducts = await this.getAll()
        const products = allProducts.products

        let newProduct = products.map(element =>{
            if(element.id == id){
                return {...product, id:id}
            }else{
                return element
            }
        })
        newProduct = JSON.stringify(newProduct, null, "\t")
        await fs.promises.writeFile(pathToFile, newProduct)
    }
    deleteAll = async () =>{
        try {
            if(fs.existsSync(pathToFile)){
                await fs.promises.unlink(pathToFile)
            }else{
            return{
            status:"error",
            message:"No products found",
            }
            }
            }catch (error){
            return{
            status: "error",
            message: error.message,
            };
            }
    }
}
export default Manager