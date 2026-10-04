# 🕹️ JUEGAZOS

## 👥 Integrantes del Grupo

- [Marcolini, Marcela](https://github.com/Marce-Marcolini)
- [Fernandez Rolon, Clara](https://github.com/clarafernandezr)
- [Cárdenas, Fabrizio](https://github.com/fleocar02)

## 📚 Datos de la Materia

- Informática General
- 2026 / Segundo Cuatrimestre
- UNA Artes Multimediales
- Valeria Drelichman | Pedro Paleo | Leonardo Nadel | Norma Morales

  ***

## 📜 Instrucciones de Juego

### 🎲 DADOS

El Cincuenta, juego clásico de dados que todos hemos jugado con amigos o familia.
Pueden jugar desde una hasta seis personas. Todos los jugadores empiezan con 0 puntos. Cada jugador debe lanzar los dados en su turno y automáticamente sumar a la puntuación cuando sale un doble (dos dados iguales)

Si son diferentes (ej: 3 y 4): Tira el próximo jugador sin sumar nada.
Si son dobles 1, 2, 4 o 5: Se suman 5 puntos.
Si son doble 6: Se suman 25 puntos.
Si son doble 3: Se castiga reiniciando la puntuación a cero.
Cuando el doble es válido, suma puntos y el jugador repite el tiro.

### 🃏 CARTAS

El Infiltrado, un juego innovador y súper divertido en el que sos un gatito travieso queriendo acceder a una pecera en la casa de las mascotas para llevarse un delicioso pececito dorado, pero te encontrarás con varios obstáculos.
Objetivo: Sumar entre 8 y 12 puntos para abrir la pecera.
Timer de 10s: El contador se reinicia con cada decisión. Si llega a 0, suena la alarma.
Acciones de Tirada: Puedes pedir 1 carta, repetir la tirada de 3 o abrir la pecera.
Alarma: Si te pasas de 12 puntos, pierdes.
Abandonar: Huye a tiempo si presientes que vas a fallar.

### ❓ PREGUNTAS

Una trivia divertida de Pokemon, la cual cuenta con 5 preguntas particulares segun el Pokemon que más te guste y elijas al principio.
Ingresá tu nombre: Escribí tu apodo de entrenador Pokémon para registrar tu partida.
Elegí tu compañero: Selecciona el Pokémon que más te guste.
Respondé las preguntas: Lee las preguntas tematizadas de tu Pokemon y selecciona la opción que creas correcta.
Sumá puntos: Cada acierto cuenta como 1 punto.

## 📁 Organización de Archivos y Carpetas

Nuestros 6 archivos HTML (index,dados,cartas,preguntas,puntajes,index) están en el root del repositorio, junto con el README. Luego contamos con 3 carpetas: css (contiene un único archivo estilos.css con los estilos de la página), js (con 4 archivos js que manejan la lógica y el procesamiento de datos de nuestros juegos (cartas,dados,puntajes,trivia)) y por último la carpeta img (contiene las imágenes usadas para el juego de dados, el de trivia y las que usamos para la página nosotros).

## 🛠️ Tecnologías y Funcionalidades

### Usadas en Dados

### Usadas en Cartas

Para este juego, primero busqué tipo de juegos de cartas. Diseñé un juego que fuese posible sumando puntos pero no tansencillo como un duelo de puntajes. Le busqué instrucciones que se transformaron en misiones.

### Usadas en Trivia

Mi proceso de hacer la trivia fue así: Primero creé las preguntas y fui pensando cómo iba a hacer un juego de preguntas más divertido, y se me ocurrió la idea de dar a elegir 5 pokemones que tengan cada uno 5 preguntas específicas. Me ayudé bastante con los ejemplos vistos en clase sobre APIs y los ejemplos del repo de la cátedra también.
Mi juego cuenta con 4 estados:

1. Ingreso de nombre de entrenador e instrucciones.
2. Selección de Pokemon.
3. Juego principal de preguntas.
4. Puntaje final con opciones de jugar de nuevo (mismo usuario) o cambiar de usuario.

Mi archivo JS tiene las siguientes funciones:

#### Funciones de utilidad

mezclar : mezcla las opciones de las preguntas
mostrarError : en caso de que haya un problema en la solicitud a la API
cargarDatosPokemon : hace la solicitud a la API con try y devuelve un array (pokeInfo) con nombre e imagen del pokemon, en caso de que no haya ningún error
cargarPreguntas : carga las 25 preguntas

#### Funciones para el juego principal

cambiarEntrenador : oculta y muestra ciertos estados y permite ingresar un nombre de usuario nuevo
comenzarConNombre : procesa el input del nombre y en caso de que no se ingrese ninguno, tira una alerta
mostrarSeleccionPokemon : crea dinámicamente un botón con el sprite extraído de la API para cada pokemon, el cual ejecuta la función iniciarJuego
iniciarJuego : recibe el nombre de un pokemon, ejecuta la funcion cargarPreguntas, la cual dentro de cada array de pregunta tiene entre sus claves la de pokemon, que esta función utiliza para filtrar de qué pokemon es cada pregunta. También reinicia las variables de control y ejecuta mostrarPregunta
mostrarPregunta : muestra cada pregunta, de a una sola, y con ayuda de un bucle busca dentro de pokeInfo la imagen para el pokemon correspondiente, luego genera botones dinámicamente para cada respuesta, los cuales al clickearlos ejecutan la función responder
responder : deshabilita el resto de botones y evalúa si la elección es correcta, si lo es, se suma a la variable correctas, si no, muestra con texto cuál era la correcta. También adapta el texto del botón 'siguiente', dependiendo si es la última pregunta o no
guardarPuntajeTrivia : busca si el jugador ya tiene un puntaje guardado dentro del localStorage (puntajesTrivia), si es así, lo guarda en una variable tablaPuntajes, si no, crea un array vacío en esta. Luego, sumo sus puntajes con un bucle for. Si no lo encontró, pushea sus resultados nuevos a un array con claves nombre y puntos; luego los guarda en el localStorage
avanzar : evalúa si es la última pregunta o no, si es así, muestra la pantalla final con puntaje y guarda los puntajes de la trivia ejecutando la función anteriormente mencionada

### Usadas en Puntajes

Generamos la tabla en HTML y la llenamos con JS, usando dos funciones:
cargarTabla : a esta función le dimos muchas vueltas, intentamos con un solo for y solo 3 resultados, luego con un for dentro de un while, pero después de mucho pensar y ayuda de la IA para optimizar, llegamos a esta función.
Esta recibe el id de la tabla y la clave del localStorage (por ejemplo, puntajesTrivia), luego recibe los valores para las celdas y los almacena en dos constantes. Luego crea una copia de los puntajes existentes en un array con forEach, para luego ir comparándolos en otro for, con una variable por fuera (indiceMayor), que va almacenando el índice del array original que tenga mayor puntaje; a medida que lo va encontrando, lo va sacando del array de copia, así no vuelve a iterar sobre ese puntaje.
mostrarTodasLasTablas : ejecuta la función cargarTabla sobre las tres tablas de puntajes
Al final ejectura la función mostrarTodasLasTablas

## 📝 Etiquetas de Commits

Para mantener un historial de cambios ordenado, todos los mensajes de commit deben comenzar con alguna de las siguientes etiquetas:

- ✨ **`feat:`** Nuevas características o funcionalidades. _Ejemplo:_ `feat: agrego sistema de puntuación para el juego de cartas`
- 🎨 **`style:`** Cambios en el diseño visual o estilos (CSS). _Ejemplo:_ `style: hago responsivo el menú de navegación con flexbox`
- 📝 **`docs:`** Modificaciones o adiciones en la documentación. _Ejemplo:_ `docs: actualizo la sección de uso de ia en el readme`
- ⚙️ **`refactor:`** Limpieza y orden del código para que sea más fácil de leer, sin cambiar cómo funciona el sitio. _Ejemplo:_ `refactor: ordeno las funciones del juego para que no estén duplicadas`

---

## 💻 Testing & Debugging

### 2.

- **`Condición inicial:`**
- **`Acción:`**
- **`Resultado esperado:`**
- **`Resultado observado:`**
- **`Solución:**`

### 1. 29/9

- **`Condición inicial:`** El juego se termina y todos los jugadores tienen su puntaje final
- **`Acción:`** Presionar el botón "comenzar juego" después de finalizar una ronda
- **`Resultado esperado:`** Vuelve a comenzar la partida desde 0 y el puntaje anterior se guarda en el localStorage.
- **`Resultado observado:`** El programa reescribe los datos anteriores, acumulando a los jugadores. Sin posibilidad de volver a jugar porque el boton se encuentra deshabilitado.
- **`Solución:**`

### 4/10

Testing.
CASO TESTIGO
Siro 18 años

OPINIÓN GENERAL DEL SITIO
Muy buenos los colores por cada juego.
Donde dice: Hola (Tu nombre)…quiero poner mi nombre.
Mejor que cada rectángulo diga el nombre del juego, en lugar del genérico DADOS, CARTAS..ETC

DADOS
De 1 solo jugador es aburrido
A partir de 2 se pone bueno
Que diga el turno de quién es màs grande

POKETRIVIA
Muy divertido
Propuesta, que marque con color la respuesta correcta.

INFILTRADO
Aunque perdí al comienzo por el tiempo… Es muy simple y fácil de ganar
Está buena la tensión pero sería mejor tener que generar sólo 12 puntos.

---

## 📜 Proceso

## 🗃️ API utilizada

PokeApi "Todos los datos de Pokémon que necesitarás en un solo lugar, fácilmente accesible a través de una moderna API RESTful gratuita de código abierto."
Esta API conserva toda la data de Pokemon, siendo actualizada por cada lanzamiento nuevo en la franquicia.
De ella extraigo el name (nombre del pokemon) y el sprites.front_default (sprite, imagen del pokemon) para utilizar en la trivia. Elegí esta API porque es una de las más completas, y me gustó la temática Pokemon para la trivia.

## 🤖 Declaración de uso de IA

#### Clara Fernandez Rolon

Utilicé ayuda de la IA Ecosia y la IA Gemini para ayudarme a optimizar el código en algunas funciones y mejoras en el estilo. La usé teniendo en cuenta que muchas veces ofrece cosas que no vimos, por eso para la lógica prefiero no usarla tanto. Para los estilos si admití algunas características de por ejemplo cursor, que no vimos específicamente, pero me parecieron adecuadas para que el sitio quede más dinámico.

#### Fabrizio Cárdenas

#### Marcela Marcolini

Utilicé la IA Gemini para optimizar la funcionalidad del java script del juego de cartas, me brindó una serie de propuestas que tuve que simplificar, generalmente sugiere el uso de GetElementById para lo que le pido que me proponga las funciones con document.querySelector, también sugiere algunas otras funciones que no hemos visto y no conozco, así que debo repreguntar varias veces y ser muy específica en lo que quiero que use. También la utilicé para trabajar un poco los estilos y para arreglar código css al momento de unificar los estilos de las páginas de dados y poketrivia.
