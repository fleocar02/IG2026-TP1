// Crear arrays y contadores
let jugadores = [];
let turnoActual = 0;

// Seleccionar elementos del DOM
const formJugadores = document.querySelector("#form-jugadores");
const turnoDiv = document.querySelector("#turno-actual");
const btnComenzar = document.querySelector("#boton-comenzar");
const btnTirar = document.querySelector("#tirar-dado");
const tablaPuntajes = document.querySelector("#tabla-puntajes");
const mensajePuntos = document.querySelector("#mensaje-puntos");
const imgDado1 = document.querySelector("#img-dado-1");
const imgDado2 = document.querySelector("#img-dado-2");

// Generar tirada de dado (1 a 6) y actualizar la interfaz
function activarDados() {
  const tirarDado = () => Math.floor(Math.random() * 6) + 1;

  const valorDado1 = tirarDado();
  const valorDado2 = tirarDado();

  imgDado1.innerHTML = `<img src="./img/dado-imagen-${valorDado1}.png" alt="Dado ${valorDado1}"/>`;
  imgDado2.innerHTML = `<img src="./img/dado-imagen-${valorDado2}.png" alt="Dado ${valorDado2}"/>`;

  return [valorDado1, valorDado2];
}

// Renderizar tabla de puntajes en el DOM
function calcularPuntaje() {
  let contenidoHTML = "";
  jugadores.forEach((jugador) => {
    contenidoHTML += `<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`;
  });
  tablaPuntajes.innerHTML = contenidoHTML;
}

// Listener de cantidad de jugadores
formJugadores.addEventListener("submit", (e) => {
  e.preventDefault();

  jugadores = [];
  turnoActual = 0;
  mensajePuntos.innerHTML = "";

  const cantJugadores = Number(document.querySelector("#cantidad-jugadores").value);

  for (let i = 0; i < cantJugadores; i++) {
    let nombre = prompt(`Nombre para Jugador ${i + 1}:`);

    while (!nombre || nombre.trim() === "") {
      nombre = prompt(`El nombre no puede estar vacío. Nombre para Jugador ${i + 1}:`);
    }

    jugadores.push({
      nombre: nombre.trim(),
      puntaje: 0,
    });
  }

  calcularPuntaje();

  btnComenzar.disabled = true;
  btnTirar.disabled = false;
  turnoDiv.innerHTML = `<p>Turno actual: <strong>${jugadores[turnoActual].nombre}</strong></p>`;
});

// Listener de boton para tirar los dados
btnTirar.addEventListener("click", () => {
  const [dado1, dado2] = activarDados();

  if (dado1 === dado2) {
    // Si los dados son iguales
    if (dado1 === 3) {
      mensajePuntos.innerHTML = `<h2>-${jugadores[turnoActual].puntaje}</h2><p>¡Doble tres! Reinicias a 0 puntos.</p>`;
      jugadores[turnoActual].puntaje = 0;
    } else if (dado1 === 6) {
      jugadores[turnoActual].puntaje += 25;
      mensajePuntos.innerHTML = `<h2>+25</h2><p>¡Doble seis!</p>`;
    } else {
      jugadores[turnoActual].puntaje += 5;
      mensajePuntos.innerHTML = `<h2>+5</h2><p>¡Doble!</p>`;
    }

    calcularPuntaje();

    // Verificación de ganador
    if (jugadores[turnoActual].puntaje >= 50) {
      tablaPuntajes.innerHTML += `<h1>¡${jugadores[turnoActual].nombre} llegó a los 50 puntos y ganó la partida!</h1>`;
      btnTirar.disabled = true;
      btnComenzar.disabled = false;
    }
  } else {
    // Si los dados son distintos, pasa el turno
    turnoActual = (turnoActual + 1) % jugadores.length;
    turnoDiv.innerHTML = `<p>Turno actual: <strong>${jugadores[turnoActual].nombre}</strong></p>`;
    mensajePuntos.innerHTML = `<p>Dados distintos. Cambio de turno.</p>`;
  }
});