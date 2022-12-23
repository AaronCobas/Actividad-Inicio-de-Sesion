const logout = document.getElementById("logout")

logout.addEventListener("click",()=>{
    Swal.fire({
        title:`Hasta luego ${user}`,
        timer: 2000
})
setTimeout(function(){
    location.href = "/logout"
},2000)
})