// js
// Crear un array para almacenar los datos de los clientes
let clientes = [];

// Crear una función para calcular el sueldo líquido
function calcularSueldo(sueldoNeto, AFP = 0.11, impuesto = 0.04, isapre = 0.045) {
  let montoDescontado =
    sueldoNeto * AFP + sueldoNeto * impuesto + sueldoNeto * isapre;
  let sueldoCalculado = sueldoNeto - montoDescontado
  localStorage.setItem('sueldoCalculado', sueldoCalculado)
  return sueldoCalculado;
}

// Crear una función para validar la respuesta del usuario
function validarRta(respuesta, textoValidar) {
  return respuesta.toLowerCase() == textoValidar;
}

// Crear una función para mostrar el mensaje en el párrafo

function mostrarMensaje(mensaje) {
  const p = document.getElementById("resultado");
  p.textContent = mensaje;
};

// Llama a una función anónima después de 3000 milisegundos (3 segundos)
setTimeout(function() {
  mostrarMensaje("Por favor ingrese su nombre ⬆️");
}, 3000);
// Crear una función para guardar los datos de los clientes en el localStorage
function guardarDatos() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Crear una función para recuperar los datos de los clientes del localStorage
function recuperarDatos() {
  let datos = localStorage.getItem("clientes");
  if (datos) {
    clientes = JSON.parse(datos);
  }
}

// Crear una función para mostrar el menor sueldo líquido de los clientes
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

// Crear una variable para indicar si es la primera vez que se ejecuta el simulador
let primeraVez = true;

function limpiarHistorial(){
  localStorage.removeItem("clientes");
  alert("Historial eliminado")
}


// Crear una función para ejecutar el simulador
function ejecutarSimulador() {
  // Recuperar los datos del localStorage
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
      if (primeraVez ) {
        mostrarMensaje(`Por favor ingrese su Remuneración que desea calcular ⬇️`);
        // Cambiar el valor de la variable a false
        primeraVez = false;
      } else {
        
      }
      // Convertir el nombre a mayúsculas
      let nombreCliente = nombre.value.toUpperCase();
      // Guardar el nombre del cliente en el array
      clientes.push({ nombre: nombreCliente });
      // Limpiar el input del nombre
      nombre.value = "";
      // Ocultar el input del nombre
      nombre.style.display = "none";
      // Ocultar el botón aceptar
      aceptar.style.display = "none";
      // Mostrar el input de la remuneración
      remuneracion.style.display = "block";
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
        `El líquido a recibir es de: $${sueldoLiquido.toLocaleString("es-CL")}`
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
    // Mostrar un mensaje de agradecimiento
    mostrarMensaje("¡Muchas gracias por preferirnos!");
    // Mostrar el menor sueldo líquido de los clientes
    mostrarMenorSueldo();
    // Ocultar los botones otra y salir
    otra.style.display = "none";
    salir.style.display = "none";
    // Mostrar el botón aceptar
    aceptar.style.display = "block";
  });
}

// Ejecutar el código cuando la página se carga completamente
document.addEventListener("DOMContentLoaded", ejecutarSimulador);