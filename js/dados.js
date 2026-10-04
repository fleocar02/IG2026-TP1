// Arrays y contadores
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

// Generar numero de dado (1 a 6) 
function activarDados() {

  const tirarDado = () => Math.floor(Math.random() * 6) + 1;

  const valorDado1 = tirarDado();
  const valorDado2 = tirarDado();

  imgDado1.innerHTML = `<img src="./img/dado-imagen-${valorDado1}.png" alt="Dado ${valorDado1}"/>`;
  imgDado2.innerHTML = `<img src="./img/dado-imagen-${valorDado2}.png" alt="Dado ${valorDado2}"/>`;

  btnTirar.disabled = false;

  return [valorDado1, valorDado2];
 
}

// Calcular y mostrar puntajes de jugadores en el DOM
function calcularPuntaje() {

  /*jugadores.forEach((jugador) => {
  tablaPuntajes.innerHTML += `<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`;
  });

  Escribir un mensaje en el innerHTML dentro del bucle forEach renderizaba el DOM a cada rato */

  let contenidoHTML = "";
  jugadores.forEach((jugador) => {
    contenidoHTML += `<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`;
  });
  tablaPuntajes.innerHTML = contenidoHTML;
}

// Crear inputs para nombres segun la cantidad de jugadores
formCantidad.addEventListener("submit", (e) => {
  e.preventDefault();
  contenedorInputs.innerHTML = "";

  const cantJugadores = Number(document.querySelector("#cantidad-jugadores").value);

  for (let i = 1; i < cantJugadores + 1; i++) {
    contenedorInputs.innerHTML += `<div class="input">
    <label for="jugador-${i}">Jugador ${i}: </label>
    <input type="text" id="jugador-${i}" class="input-nombre" placeholder="Nombre" required/>
    </div>`;
    }
    formCantidad.classList.add("oculto");
    formNombres.classList.remove("oculto");

});

//Guardar nombres de inputs e iniciar partida
formNombres.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll(".input-nombre");

  // Validar el nombre (solo espacios)
  let inputVacio = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      inputVacio = true
    }
  })

  if(inputVacio){
    alert("Por favor, ingrese un nombre válido para cada jugador (no se permiten solo espacios).")
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
  
  turnoDiv.innerHTML = `<span>Turno actual: <strong>${jugadores[turnoActual].nombre}</strong></span>`;

});

// Listener de boton que tira los dados
btnTirar.addEventListener("click", () => {

  const [dado1, dado2] = activarDados();

  if (dado1 === dado2) {
    // Si los dados son iguales
    if (dado1 === 3 && dado2 === 3) {
      mensajePuntos.innerHTML = `<h2>-${jugadores[turnoActual].puntaje}</h2><span>¡Doble tres! Reinicias a 0 puntos.</span>`;
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

      //Guardar puntajes en localStorage y mostrar en html de puntaje
      guardarPuntajesDados();
    }
  } else {
    // Si los dados son distintos, pasa el turno
    turnoActual = (turnoActual + 1) % jugadores.length;
    turnoDiv.innerHTML = `<span>Turno actual: <strong>${jugadores[turnoActual].nombre}</strong></span>`;
    mensajePuntos.innerHTML = `<span>Dados distintos. Cambio de turno.</span>`;
  }
});

// Enviar puntaje del localStorage a puntajes.html
function guardarPuntajesDados() {

  let tablaPuntajesLS = JSON.parse(localStorage.getItem("puntajesDados")) || []; // Busca tabla existente o crea un array vacio

  //Recorrer cada jugador en el array de la ultima partida 
  jugadores.forEach((jugador) => {
    let encontrado = false; 

    for(let i = 0; i < tablaPuntajesLS.length && !encontrado; i++){ //El jugador existe en el local storage?
      if (tablaPuntajesLS[i].nombre === jugador.nombre){ 
        tablaPuntajesLS[i].puntos += jugador.puntaje; 
        encontrado = true; // Si lo encuentra, le suma puntos de esta partida
      }
    }

    // Agregar jugador nuevo al array si no lo encontró
    if (!encontrado){
      tablaPuntajesLS.push({
        nombre: jugador.nombre,
        puntos: jugador.puntaje
      });
    }
  });

  //Guardar en localstorage con la clave que pide puntajes.js
  localStorage.setItem("puntajesDados", JSON.stringify(tablaPuntajesLS));

}