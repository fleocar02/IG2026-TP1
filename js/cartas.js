// Base de datos de los tipos de carta (Valores bajos: 1 a 3)
document.addEventListener("DOMContentLoaded", () => {
  const TIPOS_DE_CARTA = [
    { nombre: "Gatito Ladrón", valor: 1, icono: "😼" },
    { nombre: "Gatito Guardián", valor: 1, icono: "👁️" },
    { nombre: "Gatito Infiltrado", valor: 2, icono: "🕵🏻‍♂️🐾" },
    { nombre: "Pececito Dorado", valor: 3, icono: "🐟" },
  ];

  let mazo = [];
  let cartasMesa = [];
  let puntosMesa = 0;
  let tiempoRestante = 10;
  let intervaloTimer = null;
  let juegoTerminado = false;

  // Asignar Event Listeners con querySelector
  document.querySelector("#btn-iniciar").onclick = iniciarJuego;
  document.querySelector("#btn-robar-1").onclick = () => pedirCartas(1);
  document.querySelector("#btn-relanzar").onclick = relanzarTirada;
  document.querySelector("#btn-comprobar").onclick = comprobarObjetivo;
  document.querySelector("#btn-huir").onclick = abandonarMision;
  document.querySelector("#btn-reiniciar").onclick = reiniciarJuego;

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

  function relanzarTirada() {
    if (juegoTerminado) return;
    if (mazo.length < 3) {
      document.querySelector("#mensaje-estado").innerText =
        "⚠️ Pocas cartas en el mazo para tirar 3.";
      return;
    }
    cartasMesa = [mazo.pop(), mazo.pop(), mazo.pop()];
    calcularYActualizar();
    reiniciarTimer();
  }

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
    puntosMesa = cartasMesa.reduce((acc, c) => acc + c.valor, 0);
    actualizarInterfaz();

    if (puntosMesa > 12) {
      finalizarJuego(
        false,
        `🚨 ¡ALARMA! Te pasaste de 12 puntos (${puntosMesa} pts). Te atraparon los perros.`
      );
    }
  }
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
          "🚨 ¡TIEMPO AGOTADO! Se activó la alarma por tardar demasiado."
        );
      }
    }, 1000);
  }
  function comprobarObjetivo() {
    if (juegoTerminado) return;
    if (puntosMesa >= 8 && puntosMesa <= 12) {
      finalizarJuego(
        true,
        `🏆 ¡MISIÓN CUMPLIDA! Lograste ${puntosMesa} puntos y abriste la pecera 🐟✨.`
      );
    } else {
      document.querySelector(
        "#mensaje-estado"
      ).innerText = `⚠️ Tienes ${puntosMesa} pts. Necesitas al menos 8 pts.`;
    }
  }

  function abandonarMision() {
    if (juegoTerminado) return;
    finalizarJuego(false, "🏃‍♂️ Huiste a tiempo sin hacer ruido.");
  }
  function actualizarInterfaz() {
    document.querySelector(
      "#texto-puntaje"
    ).innerText = `Puntos en mesa: ${puntosMesa} / 12 pts`;
    document.querySelector("#contador-mazo").innerText = mazo.length;

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

  function finalizarJuego(esVictoria, mensaje) {
    juegoTerminado = true;
    clearInterval(intervaloTimer);

    const banner = document.querySelector("#banner-fin-juego");
    const textoResultado = document.querySelector("#mensaje-resultado");

    textoResultado.innerText = mensaje;
    textoResultado.style.color = esVictoria ? "#2ecc71" : "#e74c3c";
    banner.classList.remove("oculto-infiltrado");
  }

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
