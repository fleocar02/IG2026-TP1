// Base de datos de los tipos de carta (Valores bajos: 1 a 3)
document.addEventListener("DOMContentLoaded", () => {
  const TIPOS_DE_CARTA = [
    { nombre: "Gatito Ladrón", valor: 1, icono: "😼" },
    { nombre: "Gatito Guardián", valor: 1, icono: "👁️" },
    { nombre: "Gatito Infiltrado", valor: 2, icono: "🕵🏻‍♂️🐾" },
    { nombre: "Pececito Dorado", valor: 3, icono: "🐟" },
  ];
  //Declarar variables para el juego
  let mazo = [];
  let cartasMesa = [];
  let puntosMesa = 0;
  let tiempoRestante = 10;
  let intervaloTimer = null;
  let juegoTerminado = false;

  //Escuchadores de eventos para los botones
  document.querySelector("#btn-iniciar").onclick = iniciarJuego;
  document.querySelector("#btn-robar-1").onclick = () => pedirCartas(1);
  document.querySelector("#btn-relanzar").onclick = relanzarTirada;
  document.querySelector("#btn-comprobar").onclick = comprobarObjetivo;
  document.querySelector("#btn-huir").onclick = abandonarMision;
  document.querySelector("#btn-reiniciar").onclick = reiniciarJuego;

  // Crea y mezcla el mazo de 16 cartas (4 de cada tipo)
  function crearMazo() {
    let nuevoMazo = [];
    let id = 1;
    TIPOS_DE_CARTA.forEach((tipo) => {
      for (let i = 0; i < 4; i++) {
        nuevoMazo.push({ ...tipo, id: id++ });
      }
    });
    return nuevoMazo.sort(() => Math.random() - 0.5);
  }

  // Guarda puntaje en localStorage, según mejor tiempo
  function guardarPuntajeCartas(nombre, puntos, tiempo) {
    let tablaPuntajes =
      JSON.parse(localStorage.getItem("puntajesCartas")) || [];
    let nombreLimpio = nombre ? nombre.trim() : "Infiltrado";

    let jugadorExistente = tablaPuntajes.find((j) => j.nombre === nombreLimpio);

    if (jugadorExistente) {
      // Si ya existe, actualizamos solo si hizo MEJOR tiempo (menos segundos)
      if (tiempo < jugadorExistente.tiempo) {
        jugadorExistente.tiempo = tiempo;
      }
    } else {
      // Si es nuevo, lo agregamos a la tabla
      tablaPuntajes.push({
        nombre: nombreLimpio,
        puntos: puntos, // Siempre será 12
        tiempo: tiempo,
      });
    }

    localStorage.setItem("puntajesCartas", JSON.stringify(tablaPuntajes));
  }

  //Iniciar o reiniciar la mesa de juego
  function iniciarJuego() {
    mazo = crearMazo();
    cartasMesa = [];
    puntosMesa = 0;
    juegoTerminado = false;

    document
      .querySelector("#seleccion-modo")
      .classList.add("oculto-infiltrado");
    document
      .querySelector("#tablero-juego")
      .classList.remove("oculto-infiltrado");
    document
      .querySelector("#banner-fin-juego")
      .classList.add("oculto-infiltrado");

    relanzarTirada();
  }

  //Tirar de nuevo 3 cartas desde el mazo
  function relanzarTirada() {
    if (juegoTerminado) return;

    if (mazo.length < 3) {
      document.querySelector("#mensaje-estado").innerText =
        "⚠️ No quedan suficientes cartas para tirar 3.";
      return;
    }

    cartasMesa = [mazo.pop(), mazo.pop(), mazo.pop()];
    calcularYActualizar();
    reiniciarTimer();
  }

  //Robar 1 o 2 cartas de forma acumulativa
  function pedirCartas(cantidad) {
    if (juegoTerminado) return;

    if (mazo.length < cantidad) {
      document.querySelector(
        "#mensaje-estado"
      ).innerText = `⚠️ No hay suficientes cartas (${mazo.length} restantes).`;
      return;
    }

    for (let i = 0; i < cantidad; i++) {
      cartasMesa.push(mazo.pop());
    }

    calcularYActualizar();
    reiniciarTimer();
  }

  function calcularYActualizar() {
    let sumaTotal = 0;

    for (let i = 0; i < cartasMesa.length; i++) {
      sumaTotal += cartasMesa[i].valor;
    }

    puntosMesa = sumaTotal;

    actualizarInterfaz();

    // Condición de derrota automática al pasarse de 12
    if (puntosMesa > 12) {
      finalizarJuego(
        false,
        `🚨 ¡ALARMA! Sumaste ${puntosMesa} puntos (te pasaste de 12). Te atraparon los perros.`
      );
    }
  }

  //Control del temporizador de 10 segundos
  function reiniciarTimer() {
    clearInterval(intervaloTimer);
    tiempoRestante = 10;
    document.querySelector("#contador-timer").innerText = tiempoRestante;

    intervaloTimer = setInterval(() => {
      tiempoRestante--;
      document.querySelector("#contador-timer").innerText = tiempoRestante;

      if (tiempoRestante <= 0) {
        clearInterval(intervaloTimer);
        finalizarJuego(
          false,
          "🚨 ¡TIEMPO AGOTADO! Te congelaste pensando, hiciste ruido y sonó la alarma."
        );
      }
    }, 1000);
  }

  //Intentar abrir la pecera (Victoria con 12 puntos exactos)
  function comprobarObjetivo() {
    if (juegoTerminado) return;

    if (puntosMesa === 12) {
      let campoNombre = document.querySelector("#input-nombre-jugador");
      let nombreJugador = campoNombre ? campoNombre.value : "";
      let tiempoUsado = 10 - tiempoRestante; // Segundos empleados

      // Guardar/Actualizar mejor marca
      guardarPuntajeCartas(nombreJugador, puntosMesa, tiempoUsado);

      finalizarJuego(
        true,
        "🏆 ¡MISIÓN CUMPLIDA! Conseguiste exactamente 12 puntos, abriste la pecera y te llevaste el pececito 🐟✨."
      );
    } else if (puntosMesa < 12) {
      document.querySelector(
        "#mensaje-estado"
      ).innerText = `⚠️ Tienes ${puntosMesa} pts. Necesitas sumar exactamente 12 pts para abrir la pecera.`;
    }
  }

  //Abandonar voluntariamente
  function abandonarMision() {
    if (juegoTerminado) return;
    finalizarJuego(
      false,
      "🏃‍♂️ Huiste con sigilo. Te fuiste sin el pececito, pero mantienes tus 7 vidas a salvo."
    );
  }

  //Actualizar textos, alertas y cartas visuales
  function actualizarInterfaz() {
    document.querySelector(
      "#texto-puntaje"
    ).innerText = `Puntos en mesa: ${puntosMesa} / 12 pts`;
    document.querySelector("#contador-mazo").innerText = mazo.length;

    if (puntosMesa < 12) {
      document.querySelector("#mensaje-estado").innerText =
        "Te faltan puntos. Ajusta la jugada para llegar a 12 exactos sin pasarte.";
    } else if (puntosMesa === 12) {
      document.querySelector("#mensaje-estado").innerText =
        "¡Tienes 12 puntos exactos! Abre la pecera antes de que venza el tiempo.";
    }

    const contenedorTirada = document.querySelector("#contenedor-tirada");
    contenedorTirada.innerHTML = "";
    cartasMesa.forEach((carta) => {
      const div = document.createElement("div");
      div.className = "carta-infiltrado";
      div.innerHTML = `
        <div class="icono-carta-infiltrado">${carta.icono}</div>
        <div class="titulo-carta-infiltrado">${carta.nombre}</div>
        <div class="valor-carta-infiltrado">(${carta.valor} pts)</div>
      `;
      contenedorTirada.appendChild(div);
    });
  }

  //Muestra el resultado final
  function finalizarJuego(esVictoria, mensaje) {
    juegoTerminado = true;
    clearInterval(intervaloTimer);

    const banner = document.querySelector("#banner-fin-juego");
    const textoResultado = document.querySelector("#mensaje-resultado");

    textoResultado.innerText = mensaje;
    textoResultado.style.color = esVictoria ? "#51cf66" : "#ff6b6b";
    banner.classList.remove("oculto-infiltrado");
  }

  //Vuelve al menú de bienvenida
  function reiniciarJuego() {
    clearInterval(intervaloTimer);
    document
      .querySelector("#seleccion-modo")
      .classList.remove("oculto-infiltrado");
    document.querySelector("#tablero-juego").classList.add("oculto-infiltrado");
    document
      .querySelector("#banner-fin-juego")
      .classList.add("oculto-infiltrado");
  }
});
