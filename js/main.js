// Función asíncrona que obtiene el valor de la UF desde la API
async function obtenerValorUF() {
  const apiUrl = "https://www.mindicador.cl/api/uf";
  const respuesta = await fetch(apiUrl);
  if (!respuesta || !respuesta.ok) {
   
      throw new Error("Error en la solicitud");
  }
  const datos = await respuesta.json();
  const valorUF = datos.serie[0].valor;
  if (isNaN(valorUF)) {
            throw new Error("Valor de la UF no encontrado");
  }
    return valorUF;
}
//Funcion que muestra el Valor U.F
const apiUrl = "https://www.mindicador.cl/api/uf"
const valorUF = document.getElementById("UF")
fetch(apiUrl)
  .then(respuesta => {
    if(!respuesta){
      throw new Error ("Error en la solicitud")
    }
    return respuesta.json()
  }) 
  .then(datos =>{
    console.log("valor Unidad de Fomento Chile", datos.serie[0].valor)
    valorUF.textContent = 'Valor actual de la U.F '+ datos.serie[0].valor
  })
// Array para almacenar los datos de los clientes
let clientes = [];
// Crear una función para calcular el sueldo líquido
function calcularSueldo(sueldoNeto, AFP = 0.11, impuesto = 0.04, isapre = 0.045 ) {
  let montoDescontado =
    sueldoNeto * AFP + sueldoNeto * impuesto + sueldoNeto * isapre;
  let sueldoCalculado = sueldoNeto - montoDescontado 
  localStorage.setItem('sueldoCalculado', sueldoCalculado  )
  return sueldoCalculado;
}
//Promesa
const clienteDelaTabla = (permisos) => {
  return new Promise((resolve, reject) => {
    const data = localStorage.getItem("clientes")
  if(data){
    resolve(JSON.parse(data))
  }else{
    reject("no hay data en el localStorage")
  }
  })
}
function actualizarData(){
  console.log(clienteDelaTabla(false))
}
// función para validar la respuesta del usuario
function validarRta(respuesta, textoValidar) {
  return respuesta.toLowerCase() == textoValidar;
}

// función para mostrar el mensaje en el párrafo

function mostrarMensaje(mensaje) {
  const p = document.getElementById("resultado");
  p.textContent = mensaje;
};

// Llama a una función anónima después de 3000 milisegundos (2 segundos)
setTimeout(function() {
  mostrarMensaje("Por favor ingrese su nombre ⬆️");
}, 3000);
// función para guardar los datos de los clientes en el localStorage
function guardarDatos() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

// función para recuperar los datos de los clientes del localStorage
function recuperarDatos() {
  let datos = localStorage.getItem("clientes");
  if (datos) {
    clientes = JSON.parse(datos);
  }
}

// función para mostrar el menor sueldo líquido de los clientes
function mostrarMenorSueldo() {
  let menorSueldo = clientes.reduce((min, cliente) => {
    return cliente.sueldoLiquido < min.sueldoLiquido ? cliente : min;
  });
  mostrarMensaje(
    `El menor sueldo líquido es de $${menorSueldo.sueldoLiquido.toLocaleString(
      "es-CL"
    )}, correspondiente al cliente ${menorSueldo.nombre}`
  );
}

// variable para indicar si es la primera vez que se ejecuta el simulador
let primeraVez = true;

function limpiarHistorial(){
  localStorage.removeItem("clientes");
  Swal.fire({
    color:"black",
    title: "¿Estas Seguro?",
    text: "Eliminaras todo el Historial",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SI"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "OK",
        text: "Historial Eliminado",
        icon: "success",
        color:"black",
        backgraund:"gray"  
          
      });
    }
  });
 }


// función para ejecutar el simulador
function ejecutarSimulador() {
  recuperarDatos();

  // Obtener los elementos del DOM
  let nombre = document.getElementById("nombre");
  let aceptar = document.getElementById("aceptar");
  let calcular = document.getElementById("calcular");
  let otra = document.getElementById("otra");
  let salir = document.getElementById("salir");
  // Obtener el input de la remuneración
  let remuneracion = document.getElementById("remuneracion");

  // Agregar un evento al botón aceptar
  aceptar.addEventListener("click", function () {
    // Validar que el nombre no esté vacío
    if (nombre.value != "") {
      // Mostrar un mensaje de bienvenida solo si es la primera vez
      if (primeraVez) {
        primeraVez = true;
        mostrarMensaje(`Por favor ingrese su remuneración que desea calcular ⬆️`);
        // Cambiar el valor de la variable a false
        
      } else {
        
      }
      // Convertir el nombre a mayúsculas
      let nombreCliente = nombre.value.toUpperCase();
      // Guardar el nombre del cliente en el array
      clientes.push({ nombre: nombreCliente });
      
      // Mostrar el input de la remuneración
      remuneracion.style.display = "block";
      // Limpiar el input del nombre
      nombre.value = "";
      // Ocultar el input del nombre
      nombre.style.display = "none";
      // Ocultar el botón aceptar
      aceptar.style.display = "none";
      
      // Mostrar el botón calcular
      calcular.style.display = "block";
      
    } else {
      // Mostrar un mensaje de error
      mostrarMensaje("Por favor rellenar los campos solicitados 🙌");
    }
  });

  // Agregar un evento al botón calcular
  calcular.addEventListener("click", function () {
    // Convertir la remuneración a número
    let remuneracionCliente = parseFloat(remuneracion.value.replace(",", ""));
    // Validar que la remuneración sea un número
    if (!isNaN(remuneracionCliente)) {
      // Calcular el sueldo líquido
      let sueldoLiquido = calcularSueldo(remuneracionCliente);

      // Mostrar el resultado
      mostrarMensaje(
        `El líquido a recibir es de: $${sueldoLiquido.toLocaleString("es-CL")} y si deseas puedes convertir tu sueldo en U.F ⬇️`
      );
      // Guardar los datos del cliente en el array
      clientes[clientes.length - 1].sueldoLiquido = sueldoLiquido;
      clientes[clientes.length - 1].sueldoNeto = remuneracionCliente;
      // Guardar los datos en el localStorage
      guardarDatos();
      // Limpiar el input de la remuneración
      remuneracion.value = "";
      // Ocultar el input de la remuneración
      remuneracion.style.display = "none";
      // Ocultar el botón calcular
      calcular.style.display = "none";
      // Mostrar los botones otra y salir
      otra.style.display = "block";
      salir.style.display = "block";
    } else {
      // Mostrar un mensaje de error
      mostrarMensaje("Por favor ingresa un número válido 🙌");
    }
  });

  // Agregar un evento al botón otra
  otra.addEventListener("click", function () {
    // Mostrar un mensaje para ingresar otra remuneración
    mostrarMensaje("Por favor ingresa otra remuneración para continuar ⬆️ ");
    // Ocultar los botones otra y salir
    otra.style.display = "none";
    salir.style.display = "none";
    // Mostrar el input del nombre
    // nombre.style.display = "block";
    // Mostrar el input de la remuneración
    remuneracion.style.display = "block";
    // Mostrar el botón calcular
    calcular.style.display = "block";
  });

  // Agregar un evento al botón salir
  salir.addEventListener("click", function () {
    //  // Mostrar el botón aceptar
    //  aceptar.style.display = "block";
    // Mostrar un mensaje de agradecimiento
  
    mostrarMenorSueldo();
    // Ocultar los botones otra y salir
    otra.style.display = "none";
    salir.style.display = "none";
    mostrarMensaje("¡Muchas gracias por preferirnos!");
   
  });
  }
  // Función asíncrona que convierte los pesos a UF y muestra el resultado
async function convertir() {
  var pesos = document.getElementById("pesos").value;
  if (pesos > 0) {
      // Obtener el valor de la UF desde la API
      var valorUF = await obtenerValorUF();
      var uf = pesos / valorUF;
      uf = uf.toFixed(2);
      document.getElementById("result").innerHTML = pesos + " pesos = " + uf + " UF";
  } else {
      document.getElementById("result").innerHTML = "Por favor, ingrese un valor válido";
  }
}

// Ejecutar el código cuando la página se carga completamente
document.addEventListener("DOMContentLoaded", ejecutarSimulador);