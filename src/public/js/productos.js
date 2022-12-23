const socket = io()
const productTable = document.getElementById("productTable")
socket.on("productos", data =>{
    let product = ""
    data.forEach(producto=>{
        product += `<tr>
        <td style=" border:1px solid black;">${producto.title}</td>
        <td style=" border:1px solid black;">${producto.price}</td>
        <td style=" border:1px solid black;"><img style="display:block;" width="150px" height="150px" src=${producto.thumbnail}  alt=""></td>
        </tr>`
        productTable.innerHTML = product
    })
})