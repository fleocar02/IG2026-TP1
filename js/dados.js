/**
 *  🎲 JUEGO DE DADOS
 *
 *  Pueden jugar dos o más personas por turnos. Todos empiezan con 0 puntos.
 *  Cada jugador debe lanzar los dados en su turno y automáticamente sumar a
 *  la puntuación. Solo se suma cuando sale un doble.
 *
 *  • Diferentes (ej: 3 y 4) : Tira el próximo jugador sin sumar nada.
 *  • Dobles 1, 2, 4 o 5     : Se suman 5 puntos.
 *  • Doble 6                : Se suman 25 puntos.
 *  • Doble 3                : Se castiga reiniciando la puntuación a cero.
 *  • Doble válido (puntos)  : El jugador repite el tiro.
 *
 *  🏆 Gana el primer jugador que logre llegar a los 50 puntos.
 */

// ─── Pantalla de Inicio ───────────────────────────────────────────────

function activarDados() {
 // Función flecha anónima para generar un número al azar entre 1 y 6
  const tirarDado = () => Math.floor(Math.random() * 6) + 1;

  // Primer dado
  const valorDado1 = tirarDado();
  let imgDado1 = document.querySelector("#img-dado-1");
  imgDado1.innerHTML = `<img src="./img/dado-imagen-${valorDado1}.png" alt="Dado ${valorDado1}" />`;
  //console.log(`Dado 1: ${valorDado1}`);

  // Segundo dado
  const valorDado2 = tirarDado();
  let imgDado2 = document.querySelector("#img-dado-2");
  imgDado2.innerHTML = `<img src="./img/dado-imagen-${valorDado2}.png" alt="Dado ${valorDado2}" />`;
  //console.log(`Dado 2: ${valorDado2}`);

  // Uso del array para que devuelva múltiples valores al tiempo
  return [valorDado1, valorDado2];
}

activarDados();

// ─── Cantidad de Jugadores ────────────────────────────────────────────

let jugadores = [];

// Capturar elementos DOM
let formJugadores = document.querySelector("#form-jugadores");
let turnoDiv = document.querySelector("#turno-actual");
let btnComenzar = document.querySelector("#boton-comenzar");
let btnTirar = document.querySelector("#tirar-dado");
let tablaPuntajes = document.querySelector("#tabla-puntajes");

function nuevaPartida() {
  // Limpieza de contenedor
  calcularPuntaje();

  // Inicializar contador de turno para saber a que i del array sumarle los puntos
  let turnoActual = 0;

  // Escuchar evento del form
  formJugadores.addEventListener("submit", (e) => {
    e.preventDefault();

    //Captura de datos del form
    let cantJugadores = Number(
      document.querySelector("#cantidad-jugadores").value,
    );

    // Pedir input de usuario por la cantidad de jugadores ingresada
    for (let i = 0; i < cantJugadores; i++) {
      let nombre = prompt(`Nombre para Jugador ${i + 1}: `);

      // Validación del input
      while (nombre === "" || nombre === null) {
        nombre = prompt(`El nombre no puede estar vacío: `);
      }

      // Pushear datos al array vacío
      jugadores.push({
        nombre: nombre,
        puntaje: 0,
      });
    }

    // Comenzar el puntaje de todos los jugadores en 0
    calcularPuntaje();

    // Desactivar botón de comenzar
    btnComenzar.disabled = true;

    // Mostrar el jugador que debe tirar los dados con la ayuda del contador
    turnoActual = 0;
    turnoDiv.innerHTML = `Turno actual: ${jugadores[turnoActual].nombre}`;

    // Activar botón para tirar
    btnTirar.disabled = false;
  });

 // Escuchar el click del botón para tirar los dados
  btnTirar.addEventListener("click", (e) => {

    //Llamar a la función, desestructurar el array que devuelve y guardar los valores en variables nuevas
    let [dado1, dado2] = activarDados();

    //Se ejecuta si los dados son iguales
    if (dado1 === dado2) {
      //console.log(`Los dados son iguales`);

      //Si los dados son doble 3, se castiga
      if (dado1 == 3 && dado2 == 3) {
        jugadores[turnoActual].puntaje = 0;

      //Si los dados son doble 6, se premia
      } else if (dado1 == 6 && dado2 == 6) {
        jugadores[turnoActual].puntaje += 25;

      //Se suman puntos
      } else {
        jugadores[turnoActual].puntaje += 5;
      }

      calcularPuntaje();


      if (jugadores[turnoActual].puntaje >= 50) {
        tablaPuntajes.innerHTML += `<p>¡${jugadores[turnoActual].nombre} llegó a los 50 puntos y ganó la partida!</p>`;
        btnTirar.disabled = true;
      }
    } else {
      //console.log(`Los dados no son iguales`);

      turnoActual++;

      if (turnoActual == jugadores.length) {
        turnoActual = 0;
      }

      turnoDiv.innerHTML = `<p>Turno actual: ${jugadores[turnoActual].nombre}</p>`;
    }
  });

  // ─── Calcular Puntaje ────────────────────────────────────────────────

  function calcularPuntaje() {
    tablaPuntajes.innerHTML = ``;

    jugadores.forEach((jugador) => {
      tablaPuntajes.innerHTML += `<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`;
    });
  }
}

nuevaPartida();
