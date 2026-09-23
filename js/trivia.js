function cargarPreguntas() {
    pokePreguntas = [
        {
            texto: "¿Qué tipo es Pikachu?",
            correcta: "Eléctrico",
            opciones: mezclar(["Eléctrico", "Acero", "Tierra", "Fuego"]),
        },
        {
            texto: "¿A partir de qué generación Pikachu se convirtió en una evolución, dejando de ser un Pokémon base?",
            correcta: "Segunda generación",
            opciones: mezclar(["Primera generación", "Segunda generación", "Tercera generación", "Pikachu no es una evolución"]),
        },
        {
            texto: "¿A qué especie pertenece Pikachu?",
            correcta: "Ratón",
            opciones: mezclar(["Ratón", "Conejo", "Hámster", "Ninguna es correcta"]),
        },
        {
            texto: "¿Cuál es el método de evolución de Pikachu?",
            correcta: "Usar una Piedra Trueno",
            opciones: mezclar(["Usar una Piedra Trueno", "Subirlo a cierto nivel", "Intercambio", "Nivel de amistad"]),
        },
        {
            texto: "¿Cuál de estos movimientos NO puede aprender Pikachu?",
            correcta: "Mordisco",
            opciones: mezclar(["Mordisco", "Atactrueno", "Ataque rápido", "Cola de hierro"]),
        },

        {
            texto: "¿A cuál de estas especies pertenece Eevee?",
            correcta: "Ninguna es correcta",
            opciones: mezclar(["Ninguna es correcta", "Perro", "Zorro", "Ratón"]),
        },
        {
            texto: "¿Cuál de estos Pokémon NO es una Eeveevolución?",
            correcta: "Lumineon",
            opciones: mezclar(["Lumineon", "Leafeon", "Sylveon", "Glaceon"]),        },
        {
            texto: "¿Este aspecto de Jolteon es shiny o no?",
            correcta: "Sí es shiny",
            opciones: mezclar(["No es shiny", "Sí es shiny", "Jolteon no tiene ese color en ninguna de sus formas", "Es su forma de Alola"]),
            imagen: "img/JolteonS.png"
        },
        {
            texto: "¿Cuál de estos métodos NO usa Eevee para evolucionar?",
            correcta: "Subirlo a cierto nivel",
            opciones: mezclar(["Subirlo a cierto nivel", "Según la hora del día", "Nivel de amistad", "Usar Piedra de Rayo"]),        },
        {
            texto: "¿Cuál es más raro: un Eevee macho o uno hembra?",
            correcta: "La hembra",
            opciones: mezclar(["Son iguales", "El macho", "La hembra", "Los Eevee no tienen género"]),        },

        {
            texto: "¿En qué nivel evoluciona Bulbasaur?",
            correcta: "Nivel 16",
            opciones: mezclar(["Nivel 16", "Nivel 10", "Nivel 25", "Nivel 32"]),
        },
        {
            texto: "¿Cuál es el segundo tipo de Bulbasaur?",
            correcta: "Veneno",
            opciones: mezclar(["Veneno", "Bicho", "Tierra", "No tiene doble tipado"]),
        },
        {
            texto: "¿Cuál de estos tipos NO es efectivo contra Bulbasaur?",
            correcta: "Agua",
            opciones: mezclar(["Agua", "Volador", "Psíquico", "Fuego"]),
        },
        {
            texto: "¿Cuál de estos elementos es súper efectivo contra los Pokémon tipo Planta?",
            correcta: "Hielo",
            opciones: mezclar(["Roca", "Tierra", "Oscuro", "Hielo"]),
        },
        {
            texto: "¿Qué Pokémon era 'Saur', el Pokémon de Red regalado por el Profesor Oak en el manga de Pokémon Adventures?",
            correcta: "Venusaur",
            opciones: mezclar(["Venusaur", "Bulbasaur", "Yvysaur", "Eevee"]),
        },

        {
            texto: "¿En qué nivel evoluciona Charmander?",
            correcta: "Nivel 16",
            opciones: mezclar(["Nivel 16", "Nivel 10", "Nivel 25", "Nivel 32"]),
        },
        {
            texto: "¿Cuál es el segundo tipo de Charmander?",
            correcta: "No tiene doble tipado",
            opciones: mezclar(["Oscuro", "Acero", "Lucha", "No tiene doble tipado"]),
        },
        {
            texto: "¿A qué especie pertenece Charmander?",
            correcta: "Lagartija",
            opciones: mezclar(["Lagartija", "Dragón", "Serpiente", "Cocodrilo"]),
        },
        {
            texto: "¿Contra cuál de estos tipos Charmander es súper efectivo?",
            correcta: "Bicho",
            opciones: mezclar(["Normal", "Agua", "Volador", "Bicho"]),
        },
        {
            texto: "¿Cómo encuentra Ash a su Charmander antes de que se una a su equipo en el anime de Pokemon?",
            correcta: "Abandonado por su entrenador",
            opciones: mezclar(["Abandonado por su entrenador", "Jugando con un Caterpie", "Lastimado por un Ónix", "Compañero del Profesor Oak"]),
        },

        {
            texto: "¿En qué nivel evoluciona Squirtle?",
            correcta: "Nivel 16",
            opciones: mezclar(["Nivel 16", "Nivel 10", "Nivel 25", "Nivel 32"]),
        },
        {
            texto: "¿Cuál es el segundo tipo de Squirtle?",
            correcta: "No tiene doble tipado",
            opciones: mezclar(["Roca", "Hielo", "Acero", "No tiene doble tipado"]),
        },
        {
            texto: "¿Cuál de estos tipos NO recibe daño x2 al recibir un ataque de tipo Agua?",
            correcta: "Dragón",
            opciones: mezclar(["Fuego", "Dragón", "Tierra", "Roca"]),
        },
        {
            texto: "¿Cuál es la distinción visual entre un Squirtle salvaje y un Squirtle del Escuadrón Squirtle? (en el anime): El Escuadrón Squirtle...",
            correcta: "Lleva lentes",
            opciones: mezclar(["Lleva lentes", "Son todos shiny", "Son más grandes que un Squirtle común", "Tienen ropa con el escudo de su escuadrón"]),
        },
        {
            texto: "Completa la frase del meme más conocido de Squirtle: Vamo' a...",
            correcta: "Calmarno'",
            opciones: mezclar(["Calmarno'", "Educarno'", "Programarno'", "Estresarno'"]),
        }
    ];
}