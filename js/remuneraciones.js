let clientes = JSON.parse(localStorage.getItem("clientes"))
let tabla = document.getElementById("tablaClientes")
// console.log(clientes)
let tbody = tabla.getElementsByTagName("tbody")[0]
for (let i = 0; i< clientes.length;i++){
    console.log(clientes[i])
    let cliente = clientes[i]
    let row = tbody.insertRow(i)
    let celda1 = row.insertCell(0)
    console.log(celda1)
    celda1.innerHTML = cliente.nombre
    let celda2 = row.insertCell(1)
    celda2.innerHTML = cliente.sueldoNeto
    let celda3 = row.insertCell(2)
    celda3.innerHTML = cliente.sueldoLiquido 
}
