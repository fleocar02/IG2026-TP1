//--- Arrays y contadores ---//
let jugadores = [];
let turnoActual = 0;

// Seleccionar elementos del DOM
const formCantidad = document.querySelector("#form-cantidad");
const formNombres = document.querySelector("#form-nombres");
const contenedorInputs = document.querySelector("#contenedor-inputs-nombres");
const btnComenzar = document.querySelector("#boton-comenzar");
const turnoDiv = document.querySelector("#turno-actual");
const btnTirar = document.querySelector("#tirar-dado");
const imgDado1 = document.querySelector("#img-dado-1");
const imgDado2 = document.querySelector("#img-dado-2");
const tablaPuntajes = document.querySelector("#tabla-puntajes");
const mensajePuntos = document.querySelector("#mensaje-puntos");
const mensajeGanador = document.querySelector("#mensaje-ganador");
const instrucciones = document.querySelector("#instrucciones");
const seccionJuego = document.querySelector("#seccion-juego");

//--- Generar numero de dado (1 a 6) ---//
function activarDados() {
  const tirarDado = () => Math.floor(Math.random() * 6) + 1;

  const valorDado1 = tirarDado();
  const valorDado2 = tirarDado();

  imgDado1.innerHTML = `<img src="./img/dado-imagen-${valorDado1}.png" alt="Dado ${valorDado1}"/>`;
  imgDado2.innerHTML = `<img src="./img/dado-imagen-${valorDado2}.png" alt="Dado ${valorDado2}"/>`;

  btnTirar.disabled = false;

  return [valorDado1, valorDado2]; //Array con dos valores para su posterior desestructuracion
}

//--- Calcular y mostrar puntajes de jugadores en el DOM ---//
function calcularPuntaje() {
  /*jugadores.forEach((jugador) => {
  tablaPuntajes.innerHTML += `<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`;
  });
  Escribir un mensaje en el innerHTML dentro del bucle forEach renderizaba el DOM a cada rato */

  //Contenedor flexbox
  let contenidoHTML = `<div class ="contenedor-jugadores-columnas">`;

  jugadores.forEach((jugador, index) => {
    // Variable para saber quién debe tirar.
    let claseActivo = index === turnoActual ? "jugador-activo" : ""; //  Operador ternario que evalua si el indice coincide con el turno actual. Si es true, le asigna la clase de jugador activo. Si es false, no le asigna nada

    contenidoHTML += `
    <div class="columna-jugador ${claseActivo}">
    <h3>${jugador.nombre}</h3>
    <p>${jugador.puntaje} pts</p>
    </div>
    `;
  });

  contenidoHTML += `</div>`; // Etiqueta de cierre columnas al final
  tablaPuntajes.innerHTML = contenidoHTML; //Actualizar el renderizado
}

//--- Crear inputs para los nombres segun la cantidad de jugadores ---//
formCantidad.addEventListener("submit", (e) => {
  e.preventDefault();
  contenedorInputs.innerHTML = ""; //Limpiar nombres anteriores

  // Capturar numero input de usuario
  const cantJugadores = Number(
    document.querySelector("#cantidad-jugadores").value
  );

  // Crear una entrada de datos por cada jugador ingresado
  for (let i = 1; i < cantJugadores + 1; i++) {
    contenedorInputs.innerHTML += `<div class="input">
    <label for="jugador-${i}">Jugador ${i}: </label>
    <input type="text" id="jugador-${i}" class="input-nombre" placeholder="Nombre" required/>
    </div>`;
  }
  formCantidad.classList.add("oculto"); // Ocultar forms
  formNombres.classList.remove("oculto");
});

//--- Guardar nombres de inputs e iniciar partida ---//
formNombres.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll(".input-nombre");

  // Validar el nombre (solo espacios)
  let inputVacio = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      inputVacio = true;
    }
  });

  if (inputVacio) {
    alert(
      "Por favor, ingrese un nombre válido para cada jugador (no se permiten solo espacios)."
    );
    return;
  }

  jugadores = []; // Resetear variables del juego
  turnoActual = 0;
  mensajePuntos.innerHTML = ""; // Limpiar datos de partidas anteriores
  mensajeGanador.innerHTML = "";
  tablaPuntajes.innerHTML = "";

  inputs.forEach((input) => {
    jugadores.push({
      nombre: input.value.trim(),
      puntaje: 0,
    });
  });

  instrucciones.classList.add("oculto"); //Ocultar instrucciones
  formNombres.classList.add("oculto"); // Ocultar formulario
  seccionJuego.classList.remove("oculto"); // Mostrar juego

  calcularPuntaje();

  btnTirar.disabled = false;

  turnoDiv.innerHTML = `<h2>Turno actual: <strong>${jugadores[turnoActual].nombre}</strong></h2>`;
});

//--- Listener de boton que tira los dados ---//
btnTirar.addEventListener("click", () => {
  btnTirar.disabled = true; //Deshabilitar boton durante giro

  imgDado1.classList.add("girando");
  imgDado2.classList.add("girando");

  setTimeout(() => { // Temporizador de animación de giro
    imgDado1.classList.remove("girando");
    imgDado2.classList.remove("girando");

    // REecibir los valores del array y desestructurarlos
    const [dado1, dado2] = activarDados();

    // Si los dados son iguales
    if (dado1 === dado2) {
      if (dado1 === 3 && dado2 === 3) {
        mensajePuntos.innerHTML = `<h2>-${jugadores[turnoActual].puntaje}</h2><span>¡Doble tres! Reinicias a 0 puntos</span>`;
        jugadores[turnoActual].puntaje = 0;
      } else if (dado1 === 6 && dado2 === 6) {
        jugadores[turnoActual].puntaje += 25;
        mensajePuntos.innerHTML = `<h2>+25</h2><span>¡Doble seis!</span>`;
      } else {
        jugadores[turnoActual].puntaje += 5;
        mensajePuntos.innerHTML = `<h2>+5</h2><span>¡Doble!</span>`;
      }

      calcularPuntaje();

      // Verificación de ganador
      if (jugadores[turnoActual].puntaje >= 50) {

        //Renderizar tabla con puntajes finales
        calcularPuntaje();

        mensajeGanador.innerHTML += `<h2>¡${jugadores[turnoActual].nombre} llegó a los 50 puntos y ganó la partida!</h2>`;
        btnTirar.disabled = true;

        //Guardar puntajes en localStorage y mostrar en puntaje.html
        guardarPuntajesDados();
        
      }
    } else {
      // Si los dados son distintos

      /* 
      turnoActual = turnoActual + 1;
      if (turnoActual === jugadores.length) {
        turnoActual = 0;
      } 
      Usar un módulo ahorra tener que escribir este bloque de codigo más largo 
      */

      // Lista circular que vuelve al primero de la lista cuando se termina la ronda
      turnoActual = (turnoActual + 1) % jugadores.length;
      turnoDiv.innerHTML = `<h2>Turno actual: <strong>${jugadores[turnoActual].nombre}</strong></h2>`;
      mensajePuntos.innerHTML = `<span>Dados distintos</span>`;

      calcularPuntaje();

      btnTirar.disabled = false; //Habilitar boton para que tire el proximo jugador

    }
  }, 500); //500ms/0.5s
});

//--- Enviar puntaje del localStorage a puntajes.html ---//
function guardarPuntajesDados() {
  let tablaPuntajesLS = JSON.parse(localStorage.getItem("puntajesDados")) || []; // Busca tabla existente o crea un array vacio

  //Recorrer cada jugador en el array de la ultima partida
  jugadores.forEach((jugador) => {
    let encontrado = false;

    for (let i = 0; i < tablaPuntajesLS.length && !encontrado; i++) {
      //El jugador existe en el local storage?
      if (tablaPuntajesLS[i].nombre === jugador.nombre) {
        tablaPuntajesLS[i].puntos += jugador.puntaje;
        encontrado = true; // Si lo encuentra, le suma puntos de esta partida
      }
    }

    // Agregar jugador nuevo al array si no lo encontró
    if (!encontrado) {
      tablaPuntajesLS.push({
        nombre: jugador.nombre,
        puntos: jugador.puntaje,
      });
    }
  });

  //Guardar en localstorage con la clave que pide puntajes.js
  localStorage.setItem("puntajesDados", JSON.stringify(tablaPuntajesLS));
}
