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

function activarDados(){

    const tirarDado = () => Math.floor(Math.random() * 6) + 1;

    // Primer dado

        const valorDado1 = tirarDado();
        let imgDado1 = document.querySelector('#img-dado-1');
        imgDado1.innerHTML =`<img src="./img/dado-imagen-${valorDado1}.png" alt="Dado ${valorDado1}" />`;
        //console.log(`Dado 1: ${valorDado1}`);

    // Segundo dado

        const valorDado2 = tirarDado();
        let imgDado2 = document.querySelector('#img-dado-2');
        imgDado2.innerHTML =`<img src="./img/dado-imagen-${valorDado2}.png" alt="Dado ${valorDado2}" />`;
        //console.log(`Dado 2: ${valorDado2}`);

    return [valorDado1, valorDado2];
}

activarDados();


// ─── Cantidad de Jugadores ────────────────────────────────────────────

let jugadores = [];

let tablaPuntajes = document.querySelector('#tabla-puntajes');

function nuevaPartida(){

    calcularPuntaje();

    let btnComenzar = document.querySelector('#boton-comenzar');

    btnComenzar.addEventListener('click', (e) => {

        e.preventDefault();

        let cantJugadores = Number(document.querySelector('#cantidad-jugadores').value);

        for (let i = 0; i < cantJugadores; i++){

            let nombre = prompt(`Nombre para Jugador ${i + 1}: `);

            while (nombre === "" || nombre === null) {
            nombre = prompt(`El nombre no puede estar vacío: `);
            }

            jugadores.push({
                nombre: nombre,
                puntaje: 0
            });

        };

        calcularPuntaje();

        btnComenzar.disabled = true;

// ─── ¡¡¡A Jugar!!! ────────────────────────────────────────────────

        let turnoActual = 0;
        let turnoDiv = document.querySelector('#turno-actual');
        turnoDiv.innerHTML =`Turno actual: ${jugadores[turnoActual].nombre}`;

        let btnTirar = document.querySelector('#tirar-dado');
        btnTirar.disabled = false;

        btnTirar.addEventListener('click', (e) => {

            let [dado1, dado2] = activarDados();

            if(dado1 === dado2){

                //console.log(`Los dados son iguales`);

                if((dado1 == 3) && (dado2 == 3)){
                    jugadores[turnoActual].puntaje = 0;

                } else if ((dado1 == 6) && (dado2 == 6)){
                    jugadores[turnoActual].puntaje += 25;

                } else {
                    jugadores[turnoActual].puntaje += 5;
                }

            calcularPuntaje();

                if(jugadores[turnoActual].puntaje >= 50){
                    tablaPuntajes.innerHTML +=`<p>¡${jugadores[turnoActual].nombre} llegó a los 50 puntos y ganó la partida!</p>`
                    btnTirar.disabled = true;
                }

        } else {

                //console.log(`Los dados no son iguales`);

                turnoActual++

                if(turnoActual == jugadores.length){
                    turnoActual = 0;
                }

                turnoDiv.innerHTML =`<p>Turno actual: ${jugadores[turnoActual].nombre}</p>`;

            }

        });

    });

// ─── Calcular Puntaje ────────────────────────────────────────────────

        function calcularPuntaje(){

        tablaPuntajes.innerHTML =``;

        jugadores.forEach(jugador => {
            tablaPuntajes.innerHTML +=`<p>${jugador.nombre} tiene ${jugador.puntaje} punto/s.</p>`;
        });
    }

};

nuevaPartida();



