// --URL DE LA API (POKEAPI)--
const endpoint = "https://pokeapi.co/api/v2/pokemon/";

// --Elementos de la interfaz y configuración del DOM--
const estado = document.querySelector("#estado"); //Estado del juego
const seleccion = document.querySelector("#seleccion"); //Selección de Pokémon
const listaPokemon = document.querySelector("#lista-pokemon"); //Lista de Pokémon para seleccionar
const juego = document.querySelector("#juego"); //Juego de trivia
const final = document.querySelector("#final"); //Final del juego
const progreso = document.querySelector("#progreso"); //Progreso de la trivia
const elementoPregunta = document.querySelector("#pregunta"); //Pregunta actual
const opciones = document.querySelector("#opciones"); //Opciones de respuesta
const resultado = document.querySelector("#resultado"); //Resultado de la respuesta
const siguiente = document.querySelector("#siguiente"); //Botón para pasar a la siguiente pregunta o ver el resultado final
const puntaje = document.querySelector("#puntaje"); //Puntaje final del usuario
const entrenador = document.querySelector("#entrenador"); //Sección para ingresar nombre de entrenador
const inputEntrenador = document.querySelector("#nombre-entrenador"); //Input para ingresar nombre de entrenador
const reiniciar = document.querySelector("#reiniciar"); //Botón para reiniciar el juego
const reintentar = document.querySelector("#reintentar"); //Botón para reintentar cargar los datos en caso de error
const comenzar = document.querySelector("#comenzar"); //Botón para comenzar luego de ingresar nombre de entrenador
const cambiarUsuario = document.querySelector("#cambiar-usuario"); //Botón para cambiar nombre de entrenador
const instrucciones = document.querySelector("#instrucciones"); //Sección de instrucciones de la trivia

// --Declaración de variables para el estado del juego y otras variables globales--
let todasPreguntas = []; //Almacena el conjunto en su totalidad de preguntas
let pokePreguntas = []; //Almacena las preguntas filtradas según el pokemon seleccionado
let pokeInfo = []; //Almacena la información recibida del endpoint de los 5 pokemones
let nombreEntrenador = ""; //Almacena el nombre del entrenador ingresado
let indice = 0; //Controla la pregunta actual en pantalla
let correctas = 0; //Contador de aciertos del usuario

// --Funciones de utilidad--

//Función mezclar proporcionada por ejemplos de la cátedra
function mezclar(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}

//Función mostrarError proporcionada por ejemplos de la cátedra
function mostrarError(mensaje) {
    estado.textContent = mensaje;
    estado.className = "rojo";
    seleccion.classList.add("oculto"); //Agrego mi pantalla de selección para que también se oculte en caso de error
    juego.classList.add("oculto");
    final.classList.add("oculto");
    reintentar.hidden = false;
}

//Inspirada en la función cargarPreguntas() del ejemplo 3 proporcionado por la cátedra
async function cargarDatosPokemon() {
    const listaNombres = ['pikachu', 'eevee', 'squirtle', 'bulbasaur', 'charmander']; //agrego nombres de pokemones para insertar en la URL de la API
    const resultados = []; //Utilizo un array para resultados, ya que de la API obtengo dos datos por pokemon: nombre e imagen (sprite)

    estado.className = "gris";
    estado.textContent = "Capturando Pokemones...";
    juego.classList.add("oculto");
    final.classList.add("oculto");
    seleccion.classList.add("oculto");
    reintentar.hidden = true;
    siguiente.hidden = true;

    try {
        for (let i = 0; i < listaNombres.length; i++) { //Utilizo un bucle for para recorrer mi lista de nombres y hacer una petición por pokemon
            let nombre = listaNombres[i];
            const respuesta = await fetch(`${endpoint}${nombre}`); //Uso de IA: Me aconsejó con la idea de concatenar la URL de la API con cada nombre, para automatizar la petición

            if (!respuesta.ok) {
                throw new Error(`HTTP ${respuesta.status}`);
            }

            const datos = await respuesta.json();

            let imagen = datos.sprites.front_default; //Nombre del sprite default (foto común del pokemon) dentro de los recursos de la API

            resultados.push({ //El array mencionado previamente, que almacena cada pokemon como un objeto
                nombre: datos.name,
                imagen: imagen
            });
        }

        pokeInfo = resultados;

    } catch (error) {
        mostrarError(`No se pudo cargar los Pokémon: ${error.message}`);
    }
}

//Función que carga mis preguntas, mezclando sus opciones
function cargarPreguntas() {
    todasPreguntas = [
        {
            texto: "¿Qué tipo es Pikachu?",
            correcta: "Eléctrico",
            opciones: mezclar(["Eléctrico", "Acero", "Tierra", "Fuego"]),
            pokemon: "pikachu" //Este atributo permite filtrar las preguntas según el Pokémon seleccionado
        },
        {
            texto: "¿A partir de qué generación Pikachu se convirtió en una evolución, dejando de ser un Pokémon base?",
            correcta: "Segunda generación",
            opciones: mezclar(["Primera generación", "Segunda generación", "Tercera generación", "Pikachu no es una evolución"]),
            pokemon: "pikachu"
        },
        {
            texto: "¿A qué especie pertenece Pikachu?",
            correcta: "Ratón",
            opciones: mezclar(["Ratón", "Conejo", "Hámster", "Ninguna es correcta"]),
            pokemon: "pikachu"
        },
        {
            texto: "¿Cuál es el método de evolución de Pikachu?",
            correcta: "Usar una Piedra Trueno",
            opciones: mezclar(["Usar una Piedra Trueno", "Subirlo a cierto nivel", "Intercambio", "Nivel de amistad"]),
            pokemon: "pikachu"
        },
        {
            texto: "¿Cuál de estos movimientos NO puede aprender Pikachu?",
            correcta: "Mordisco",
            opciones: mezclar(["Mordisco", "Atactrueno", "Ataque rápido", "Cola de hierro"]),
            pokemon: "pikachu"
        },

        {
            texto: "¿A cuál de estas especies pertenece Eevee?",
            correcta: "Ninguna es correcta",
            opciones: mezclar(["Ninguna es correcta", "Perro", "Zorro", "Ratón"]),
            pokemon: "eevee"
        },
        {
            texto: "¿Cuál de estos Pokémon NO es una Eeveevolución?",
            correcta: "Lumineon",
            opciones: mezclar(["Lumineon", "Leafeon", "Sylveon", "Glaceon"]),
            pokemon: "eevee"
        },
        {
            texto: "¿Este aspecto de Jolteon es shiny o no?",
            correcta: "Sí es shiny",
            opciones: mezclar(["No es shiny", "Sí es shiny", "Jolteon no tiene ese color en ninguna de sus formas", "Es su forma de Alola"]),
            pokemon: "eevee",
            imagen: "img/JolteonS.png" //Uso de IA: Me sugirió agregar un atributo imagen para poder mostrar la imagen de Jolteon sin tener que extraer ese sprite en específico (distinto al de los demás que es el normal)
        },
        {
            texto: "¿Cuál de estos métodos NO usa Eevee para evolucionar?",
            correcta: "Subirlo a cierto nivel",
            opciones: mezclar(["Subirlo a cierto nivel", "Según la hora del día", "Nivel de amistad", "Usar Piedra de Rayo"]),
            pokemon: "eevee"
        },
        {
            texto: "¿Cuál es más raro: un Eevee macho o uno hembra?",
            correcta: "La hembra",
            opciones: mezclar(["Son iguales", "El macho", "La hembra", "Los Eevee no tienen género"]),
            pokemon: "eevee"
        },

        {
            texto: "¿En qué nivel evoluciona Bulbasaur?",
            correcta: "Nivel 16",
            opciones: mezclar(["Nivel 16", "Nivel 10", "Nivel 25", "Nivel 32"]),
            pokemon: "bulbasaur"
        },
        {
            texto: "¿Cuál es el segundo tipo de Bulbasaur?",
            correcta: "Veneno",
            opciones: mezclar(["Veneno", "Bicho", "Tierra", "No tiene doble tipado"]),
            pokemon: "bulbasaur"
        },
        {
            texto: "¿Cuál de estos tipos NO es efectivo contra Bulbasaur?",
            correcta: "Agua",
            opciones: mezclar(["Agua", "Volador", "Psíquico", "Fuego"]),
            pokemon: "bulbasaur"
        },
        {
            texto: "¿Cuál de estos elementos es súper efectivo contra los Pokémon tipo Planta?",
            correcta: "Hielo",
            opciones: mezclar(["Roca", "Tierra", "Siniestro", "Hielo"]),
            pokemon: "bulbasaur"
        },
        {
            texto: "¿Qué Pokémon era 'Saur', el Pokémon de Red regalado por el Profesor Oak en el manga de Pokémon Adventures?",
            correcta: "Venusaur",
            opciones: mezclar(["Venusaur", "Bulbasaur", "Yvysaur", "Eevee"]),
            pokemon: "bulbasaur"
        },

        {
            texto: "¿En qué nivel evoluciona Charmander?",
            correcta: "Nivel 16",
            opciones: mezclar(["Nivel 16", "Nivel 10", "Nivel 25", "Nivel 32"]),
            pokemon: "charmander"
        },
        {
            texto: "¿Cuál es el segundo tipo de Charmander?",
            correcta: "No tiene doble tipado",
            opciones: mezclar(["Siniestro", "Acero", "Lucha", "No tiene doble tipado"]),
            pokemon: "charmander"
        },
        {
            texto: "¿A qué especie pertenece Charmander?",
            correcta: "Lagartija",
            opciones: mezclar(["Lagartija", "Dragón", "Serpiente", "Cocodrilo"]),
            pokemon: "charmander"
        },
        {
            texto: "¿Contra cuál de estos tipos Charmander es súper efectivo?",
            correcta: "Bicho",
            opciones: mezclar(["Normal", "Agua", "Volador", "Bicho"]),
            pokemon: "charmander"
        },
        {
            texto: "¿Cómo encuentra Ash a su Charmander antes de que se una a su equipo en el anime de Pokemon?",
            correcta: "Abandonado por su entrenador",
            opciones: mezclar(["Abandonado por su entrenador", "Jugando con un Caterpie", "Lastimado por un Ónix", "Compañero del Profesor Oak"]),
            pokemon: "charmander"
        },

        {
            texto: "¿En qué nivel evoluciona Squirtle?",
            correcta: "Nivel 16",
            opciones: mezclar(["Nivel 16", "Nivel 10", "Nivel 25", "Nivel 32"]),
            pokemon: "squirtle"
        },
        {
            texto: "¿Cuál es el segundo tipo de Squirtle?",
            correcta: "No tiene doble tipado",
            opciones: mezclar(["Roca", "Hielo", "Acero", "No tiene doble tipado"]),
            pokemon: "squirtle"
        },
        {
            texto: "¿Cuál de estos tipos NO recibe daño x2 al recibir un ataque de tipo Agua?",
            correcta: "Dragón",
            opciones: mezclar(["Fuego", "Dragón", "Tierra", "Roca"]),
            pokemon: "squirtle"
        },
        {
            texto: "¿Cuál es la distinción visual entre un Squirtle salvaje y un Squirtle del Escuadrón Squirtle? (en el anime): El Escuadrón Squirtle...",
            correcta: "Lleva lentes",
            opciones: mezclar(["Lleva lentes", "Son todos shiny", "Son más grandes que un Squirtle común", "Tienen ropa con el escudo de su escuadrón"]),
            pokemon: "squirtle"
        },
        {
            texto: "Completa la frase del meme más conocido de Squirtle: Vamo' a...",
            correcta: "Calmarno'",
            opciones: mezclar(["Calmarno'", "Educarno'", "Programarno'", "Estresarno'"]),
            pokemon: "squirtle"
        }
    ];
}

// --Lógica del juego--

//Función para cambiar de entrenador luego de terminar una trivia
function cambiarEntrenador() {
    inputEntrenador.value = "";
    entrenador.classList.remove("oculto");
    instrucciones.classList.remove("oculto");
    estado.textContent = "";
    final.classList.add("oculto");
    juego.classList.add("oculto");
    reiniciar.hidden = true;
}


function comenzarConNombre() {
    const nombre = inputEntrenador.value;
    if (nombre === "") {//Alerta en caso de que el usuario no haya ingresado un nombre
        alert("No ingresaste un nombre de entrenador. Ingresá un nombre para continuar.");
        return;
    }

    nombreEntrenador = nombre;
    entrenador.classList.add("oculto");
    instrucciones.classList.add("oculto");
    seleccion.classList.remove("oculto");
    mostrarSeleccionPokemon();
}

function mostrarSeleccionPokemon() {
    estado.textContent = "";
    final.classList.add("oculto");
    juego.classList.add("oculto");
    seleccion.classList.remove("oculto");
    listaPokemon.innerHTML = "";
    reiniciar.hidden = true;

    pokeInfo.forEach((poke) => { //Uso de función flecha enseñada en clase con forEach para recorrer cada objeto correspondiente a cada pokemon (dentro del array pokeInfo)
        const divPoke = document.createElement("button");//Finalmente terminé yendo con un botón más clásico, no me sirvió el div sugerido por la IA
        divPoke.type = "button";
        divPoke.className = "tarjeta-pokemon";
        divPoke.innerHTML = `<img src="${poke.imagen}" alt="${poke.nombre}"> <span>${poke.nombre}</span>`; //Uso de IA: No me salía la inserción de la imagen y me sugirió la misma idea de concatenar como hice con la URL de la API, y me dio la idea de usar un span para mostrar el nombre del pokemon abajo de la imagen
        divPoke.addEventListener("click", () => iniciarJuego(poke.nombre)); //Cuando clickeo, inicio el juego con el pokemon elegido
        listaPokemon.append(divPoke);
    });
}

function iniciarJuego(nombrePokemon) {
    cargarPreguntas();
    pokePreguntas = [];
    for (let i = 0; i < todasPreguntas.length; i++) {
        if (todasPreguntas[i].pokemon === nombrePokemon) {
            pokePreguntas.push(todasPreguntas[i]);
        }
    }
    // Reinicio de variables de control
    indice = 0;
    correctas = 0;

    seleccion.classList.add("oculto");
    juego.classList.remove("oculto");
    estado.textContent = `Trivia de ${nombrePokemon}`;
    mostrarPregunta();
}

function mostrarPregunta() {
    const actual = pokePreguntas[indice];
    progreso.textContent = `Pregunta ${indice + 1} de ${pokePreguntas.length}`;
    opciones.innerHTML = "";
    resultado.textContent = "";
    siguiente.hidden = true;

    let urlImagen = "";
    //Debido a que mis preguntas tienen imágenes, tuve que dar bastantes vueltas con esto para que funcione
    if (actual.imagen) {
        urlImagen = actual.imagen; //Esta parte del if es en el caso de mi pregunta sobre Jolteon, donde uso una imagen local
    } else if (actual.pokemon) {//Luego en esta parte, busca la imagen del pokemon en el array pokeInfo
        let encontrado = false;//Inicio con una variable booleana

        for (let i = 0; i < pokeInfo.length && !encontrado; i++) {
            if (pokeInfo[i].nombre === actual.pokemon) { //Busca la imagen dentro de pokeInfo para el pokemon correspondiente
                urlImagen = pokeInfo[i].imagen;
                encontrado = true;//Al encontrar el pokemon, finaliza el bucle
            }
        }
    }
    elementoPregunta.innerHTML = `<img src="${urlImagen}" width="120" alt="${actual.pokemon}"><br>${actual.texto}`;//Aquí utilizo la urlImagen

    // Genera dinámicamente un botón por cada opción disponible (proporcionado por ejemplo de la cátedra)
    actual.opciones.forEach((opcion) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = opcion;
        boton.addEventListener("click", () => responder(opcion));
        opciones.append(boton);
    });
}

//Función responder proporcionada por la cátedra
function responder(eleccion) {
    const actual = pokePreguntas[indice];
    const botones = document.querySelectorAll("#opciones button");

    //Permite una única respuesta
    botones.forEach((boton) => {
        boton.disabled = true;
    });

    //Verifica si es correcta
    if (eleccion === actual.correcta) {
        correctas += 1;
        resultado.textContent = "Correcto";
    } else {
        resultado.textContent = `Incorrecto. La respuesta era: ${actual.correcta}`;
    }

    // Adapta el texto del botón según si es la última pregunta o no
    siguiente.textContent = indice === pokePreguntas.length - 1
        ? "Ver resultado"
        : "Siguiente pregunta";
    siguiente.hidden = false;
}

function guardarPuntajeTrivia() {
    let tablaPuntajes = JSON.parse(localStorage.getItem("puntajesTrivia")) || [];//Si el jugador ya jugó, obtengo sus puntos, si no, creo un array vacío para guardarlos

    let encontrado = false;
    for (let i = 0; i < tablaPuntajes.length && !encontrado; i++) {//Recorro el array de puntajes para ver si el usuario ya jugó
        if (tablaPuntajes[i].nombre === nombreEntrenador) {
            tablaPuntajes[i].puntos += correctas;//Si es así, sumo sus puntos a los que ya tenía
            encontrado = true;
        }
    }

    if (!encontrado) {//Si no, lo agrego a mi array de puntajes
        tablaPuntajes.push({
            nombre: nombreEntrenador,
            puntos: correctas
        });
    }
    localStorage.setItem("puntajesTrivia", JSON.stringify(tablaPuntajes));//Guardo los datos en el localStorage
}

function avanzar() {
    indice += 1;

    if (indice < pokePreguntas.length) {
        mostrarPregunta();
    } else {
        // Fin del juego: oculta la pantalla de juego y muestra el puntaje final
        juego.classList.add("oculto");
        puntaje.textContent = `Respuestas correctas: ${correctas} de ${pokePreguntas.length}`;
        final.classList.remove("oculto");
        reiniciar.hidden = false;
        guardarPuntajeTrivia();//Guarda el puntaje del usuario para la tabla
    }
}

// --Inicialización--
siguiente.addEventListener("click", avanzar);
reintentar.addEventListener("click", cargarDatosPokemon);
reiniciar.addEventListener("click", mostrarSeleccionPokemon);
comenzar.addEventListener("click", comenzarConNombre);
cambiarUsuario.addEventListener("click", cambiarEntrenador);

// --Primera llamada--
cargarDatosPokemon();