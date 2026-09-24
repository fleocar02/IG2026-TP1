/*
   🎲 CINCUENTA
 
   Puede jugar desde una persona hasta seis personas por turnos. Todos los jugadores empiezan con 0 puntos.
   Cada jugador debe lanzar los dados en su turno y automáticamente sumar a
   la puntuación. Solo se suma cuando sale un doble.
 
   Tipos de doble:
   - Diferentes (ej: 3 y 4) : Tira el próximo jugador sin sumar nada.
   - Dobles 1, 2, 4 o 5     : Se suman 5 puntos.
   - Doble 6                : Se suman 25 puntos.
   - Doble 3                : Se castiga reiniciando la puntuación a cero.
   - Doble válido (puntos)  : El jugador repite el tiro.
 
   🏆 Gana el primer jugador que logre llegar a los 50 puntos.
 */

function activarDados() {
  const tirarDado = () => Math.floor(Math.random() * 6) + 1;// Función flecha anónima para generar un número al azar entre 1 y 6

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

  return [valorDado1, valorDado2];// Uso de array para que devuelva múltiples valores al tiempo, sino devuelve uno solo
}

activarDados();

// ─── Variables y Selección del DOM ─────────────────────────────────────

let jugadores = [];

let formJugadores = document.querySelector("#form-jugadores");// Capturar los elementos del DOM
let turnoDiv = document.querySelector("#turno-actual");
let btnComenzar = document.querySelector("#boton-comenzar");
let btnTirar = document.querySelector("#tirar-dado");
let tablaPuntajes = document.querySelector("#tabla-puntajes");
let mensajePuntos = document.querySelector("#mensaje-puntos");


function nuevaPartida() {
  calcularPuntaje();// Limpieza de contenedor de puntajes 

  jugadroes = []; // reiniciar array para cada nueva partida

  let turnoActual = 0;// Inicializar contador de turno para saber a que i del array sumarle los puntos

  formJugadores.addEventListener("submit", (e) => {// Escuchar evento del form

    e.preventDefault();

    //Captura de datos del form
    let cantJugadores = Number(
      document.querySelector("#cantidad-jugadores").value,
    );

    // Pedir input de usuario por la cantidad de jugadores ingresada con bucle for y validar que no ingresen un espacio o null
    for (let i = 0; i < cantJugadores; i++) {
      let nombre = prompt(`Nombre para Jugador ${i + 1}: `);

      // Validación del input
      while (nombre === "" || nombre === null) {
        nombre = prompt(`El nombre no puede estar vacío: `);
      }

      // Pushear datos al array vacío declarado
      jugadores.push({
        nombre: nombre,
        puntaje: 0,
      });
    }

    calcularPuntaje(); // Comenzar el puntaje de todos los jugadores en 0

    btnComenzar.disabled = true; // Desactivar botón de comenzar

    // Mostrar el jugador que debe tirar los dados con la ayuda del contador
    turnoActual = 0;
    turnoDiv.innerHTML = `Turno actual: ${jugadores[turnoActual].nombre}`;

    btnTirar.disabled = false;// Activar botón para tirar
  });

 // Escuchar el click del botón para tirar los dados
  btnTirar.addEventListener("click", (e) => {

    let [dado1, dado2] = activarDados();  //Llamar a la función, desestructurar el array que devuelve y guardar los valores en variables nuevas


    //Se ejecuta si los dados son iguales
    if (dado1 === dado2) {

      //console.log(`Los dados son iguales`);

      //Si los dados son doble 3, se castiga
      if (dado1 == 3 && dado2 == 3) {
        mensajePuntos.innerHTML=`<h3>-${jugadores[turnoActual].puntaje}</h3>`;
        jugadores[turnoActual].puntaje = 0;

      //Si los dados son doble 6, se premia
      } else if (dado1 == 6 && dado2 == 6) {
        jugadores[turnoActual].puntaje += 25;
        mensajePuntos.innerHTML=`<h3>+25</h3>`;
          

      //Se suman puntos
      } else {
        jugadores[turnoActual].puntaje += 5;
        mensajePuntos.innerHTML=`<h3>+5</h3>`;

      }

      calcularPuntaje();


      if (jugadores[turnoActual].puntaje >= 50) {
        tablaPuntajes.innerHTML += `<p>¡${jugadores[turnoActual].nombre} llegó a los 50 puntos y ganó la partida!</p>`;
        btnTirar.disabled = true; // Deshabilitar boton de tirar
        btnComenzar.disabled = false // Habilitar boton para volver a jugar
      }
      
    } else {

      //console.log(`Los dados no son iguales`);

      turnoActual++;

      if (turnoActual == jugadores.length) { //devuelve el contador de turno a 0 para que respete el orden
        turnoActual = 0;
      }

      turnoDiv.innerHTML = `<p>Turno actual: ${jugadores[turnoActual].nombre}</p>`;

      mensajePuntos.innerHTML=``;

    }

  });

  // ─── Calcular Puntaje ────────────────────────────────────────────────

  function calcularPuntaje() {
    tablaPuntajes.innerHTML = ``; // Vaciar tabla de puntajes

    jugadores.forEach((jugador) => { //funcion forEach que recorre en el array de jugadores y por cada uno muestra el puntaje
      tablaPuntajes.innerHTML += `<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`; // utilizo el operador += ya que si no, los puntajes se irían borrando a medida que tiran los dados, de esta forma, se suman
    });
  }
}

nuevaPartida();
