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

---

# 🗺️ Índice de Contenidos

- [🕹️ JUEGAZOS](#️-juegazos)
  - [👥 Integrantes del Grupo](#-integrantes-del-grupo)
  - [📚 Datos de la Materia](#-datos-de-la-materia)
- [📜 Instrucciones de Juego](#-instrucciones-de-juego)
  - [🎲 DADOS](#-dados)
  - [🃏 CARTAS](#-cartas)
  - [❓ PREGUNTAS](#-preguntas)
- [📁 Organización de Archivos y Carpetas](#-organización-de-archivos-y-carpetas)
- [🛠️ Tecnologías y Funcionalidades](#️-tecnologías-y-funcionalidades)
  - [Usadas en Dados](#usadas-en-dados)
  - [Usadas en Cartas](#usadas-en-cartas)
  - [Usadas en Trivia](#usadas-en-trivia)
  - [Usadas en Puntajes](#usadas-en-puntajes)
- [📝 Etiquetas de Commits](#-etiquetas-de-commits)
- [💻 Testing & Debugging](#-testing--debugging)
  - [Testing](#testing)
    - [CASO TESTIGO #1](#caso-testigo-1)
    - [CASO TESTIGO #2](#caso-testigo-2)
  - [Debugging](#debugging)
- [🗃️ API utilizada](#️-api-utilizada)
- [🤖 Declaración de uso de IA](#-declaración-de-uso-de-ia)
- [🌐 Validación de Código W3C](#-validacion-de-codigo-w3c)

---

## 📜 Instrucciones de Juego

### 🎲 DADOS
El Cincuenta, juego clásico de dados que todos hemos jugado con amigos o familia.
Pueden jugar desde una hasta seis personas. Todos los jugadores empiezan con 0 puntos. Cada jugador debe lanzar los dados en su turno y automáticamente sumar a la puntuación cuando sale un doble (dos dados iguales). Tirá los dados, y:
- Si son diferentes (ej: 3 y 4): Tira el próximo jugador sin sumar nada.
- Si son dobles 1, 2, 4 o 5: Se suman 5 puntos.
- Si son doble 6: Se suman 25 puntos.
- Si son doble 3: Se castiga reiniciando la puntuación a cero.
- Cuando el doble es válido, suma puntos y el jugador repite el tiro.

### 🃏 CARTAS
El Infiltrado, un juego innovador y súper divertido en el que sos un gatito travieso queriendo acceder a una pecera en la casa de las mascotas para llevarse un delicioso pececito dorado, pero te encontrarás con varios obstáculos.
- Objetivo: 12 puntos para abrir la pecera.
- Timer de 10s: El contador se reinicia con cada decisión. Si llega a 0, suena la alarma.
- Acciones de Tirada: Puedes pedir 1 carta, repetir la tirada de 3 o abrir la pecera.
- Alarma: Si te pasas de 12 puntos, pierdes.
- Abandonar: Huye a tiempo si presientes que vas a fallar.

### ❓ PREGUNTAS
Una trivia divertida de Pokemon, la cual cuenta con 5 preguntas particulares segun el Pokemon que más te guste y elijas al principio.
- Ingresá tu nombre: Escribí tu apodo de entrenador Pokémon para registrar tu partida.
- Elegí tu compañero: Selecciona el Pokémon que más te guste.
- Respondé las preguntas: Lee las preguntas tematizadas de tu Pokemon y selecciona la opción que creas correcta.
- Sumá puntos: Cada acierto cuenta como 1 punto.

---

## 📁 Organización de Archivos y Carpetas

```text
IG2026-TP1/
├── css/
│   └── estilos.css        # Estilos globales y específicos (Dados, Cartas, Trivia)
├── img                    # Contiene las imágenes usadas para el juego de dados, el de trivia y la página nosotros.html
├── js/
│   ├── puntajes.js        # Procesamiento del puntaje en todos los juegos
│   ├── dados.js           # Lógica del juego Cincuenta
│   ├── cartas.js          # Lógica del juego El Infiltrado
│   └── trivia.js          # Lógica de la Poketrivia
├── index.html             # Página de Inicio
├── dados.html             # Vista principal del juego Cincuenta
├── trivia.html            # Vista de la Poketrivia
├── cartas.html            # Vista del juego El Infiltrado
├── puntajes.html          # Tabla general de posiciones
└── nosotros.html          # Información sobre nosotros
└── README.md              # Documentación

```
---

## 🛠️ Tecnologías y Funcionalidades
- **`HTML5:`** Estructura semántica global del sitio mediante contenedores de sección (`header`, `nav`, `main`, `section`, `footer`), formularios de configuración e ingreso de datos, tablas dinámicas para el registro de posiciones, modales de estado y áreas interactivas de juego.

- **`CSS3:`** Maquetación responsiva basada en Flexbox para la alineación de componentes y tarjetas de navegación. Se diseñó un sistema de estilos modular utilizando una paleta de colores unificada y representativa para cada juego, junto con selectores de clase e identificadores, pseudo-clases (`:hover`, `:disabled`) y animación con @keyframes para la interacción en pantalla.

- **`JavaScript (Vanilla JS):`** Lógica orientada a objetos y funciones modulares sin librerías externas. Implementación de manipulación del DOM en tiempo real, gestión de eventos del usuario (clics, envíos de formulario, pulsaciones de teclas), temporizadores, peticiones asíncronas (`fetch` / `async-await`) a APIs externas y persistencia de datos mediante localStorage.

- Menú de navegación global que permite navegar entre los diferentes juegos, la tabla de posiciones y la sección sobre nosotros.

### 1. Módulo de Dados

- **Generación Aleatoria y Renderizado Visual de Dados:** Implementación de funciones para simular el lanzamiento de dos dados (del 1 al 6) e inyección de imágenes correspondientes en el DOM.
- **Registro Dinámico de Jugadores:** Captura de datos a través de formularios, permitiendo configurar partidas de 1 a 6 personas y validación de nombres mediante `.trim()` para evitar campos vacíos.
- **Evaluación de Reglas y Sistema de Puntajes:** Lógica condicional que calcula combinaciones especiales (doble 3 reinicia a cero, dobles 1/2/4/5 suman 5 puntos, doble 6 suma 25 puntos y dados distintos pasan el turno).
- **Control de Turnos e Indicador:** Sistema de rotación de turnos mediante iteración modular sobre el array de jugadores, acompañado de una clase que resalta al jugador activo en cada tirada.
- **Tabla de Posiciones y Verificación de Victoria:** Actualización automática del puntaje acumulado de cada participante y detección automática del primer jugador en alcanzar los 50 puntos para finalizar la partida.

---

### 2. Módulo de Cartas
Para este juego, primero busqué tipo de juegos de cartas. Diseñé un juego que fuese posible sumando puntos pero no tan sencillo como un duelo de puntajes. Le busqué instrucciones que se transformaron en misiones.

#### Funcionalidades
- **Mazo Dinámico con creación de Baraja:** Generación automática de cartas con valores y tipos predefinidos, mezcladas aleatoriamente.
- **Control de Estado de Juego:** Seguimiento en tiempo real de los puntos acumulados, las cartas en mesa y el estado del mazo disponible.
- **Creación de Temporizador Regresivo (10s):** Contador dinámico gestionado con `setInterval()` que se reinicia con cada acción y dispara la derrota si llega a cero.
- **Mecánica de Selección y Evaluación:** Permite robar 1 o 2 cartas, relanzar la tirada o verificar el objetivo de victoria (exactamente 12 puntos).

---

### 3. Módulo de Trivia
Mi proceso de hacer la trivia fue así: Primero creé las preguntas y fui pensando cómo iba a hacer un juego de preguntas más divertido, y se me ocurrió la idea de dar a elegir 5 pokemones que tengan cada uno 5 preguntas específicas. Me ayudé bastante con los ejemplos vistos en clase sobre APIs y los ejemplos del repo de la cátedra también.
Mi juego cuenta con 4 estados:

1. Ingreso de nombre de entrenador e instrucciones.
2. Selección de Pokemon.
3. Juego principal de preguntas.
4. Puntaje final con opciones de jugar de nuevo (mismo usuario) o cambiar de usuario.

Mi archivo JS tiene las siguientes funciones:

#### De utilidad:
- `mezclar`: mezcla las opciones de las preguntas.
- `mostrarError`: en caso de que haya un problema en la solicitud a la API.
- `cargarDatosPokemon`: hace la solicitud a la API con try y devuelve un array (pokeInfo) con nombre e imagen del pokemon, en caso de que no haya ningún error.
- `cargarPreguntas`: carga las 25 preguntas.

#### Para el juego principal:
- `cambiarEntrenador`: oculta y muestra ciertos estados y permite ingresar un nombre de usuario nuevo.
- `comenzarConNombre`: procesa el input del nombre y en caso de que no se ingrese ninguno, tira una alerta.
- `mostrarSeleccionPokemon`: crea dinámicamente un botón con el sprite extraído de la API para cada pokemon, el cual ejecuta la función iniciarJuego.
- `iniciarJuego`: recibe el nombre de un pokemon, ejecuta la funcion cargarPreguntas, la cual dentro de cada array de pregunta tiene entre sus claves la de pokemon, que esta función utiliza para filtrar de qué pokemon es cada pregunta. También reinicia las variables de control y ejecuta `mostrarPregunta`.
- `mostrarPregunta`: muestra cada pregunta, de a una sola, y con ayuda de un bucle busca dentro de pokeInfo la imagen para el pokemon correspondiente, luego genera botones dinámicamente para cada respuesta, los cuales al clickearlos ejecutan la función responder.
- `responder`: deshabilita el resto de botones y evalúa si la elección es correcta, si lo es, se suma a la variable correctas, si no, muestra con texto cuál era la correcta. También adapta el texto del botón `siguiente`, dependiendo si es la última pregunta o no.
- `guardarPuntajeTrivia`: busca si el jugador ya tiene un puntaje guardado dentro del localStorage (puntajesTrivia), si es así, lo guarda en una variable tablaPuntajes, si no, crea un array vacío en esta. Luego, sumo sus puntajes con un bucle for. Si no lo encontró, pushea sus resultados nuevos a un array con claves nombre y puntos; luego los guarda en el `localStorage`.
- `avanzar`: evalúa si es la última pregunta o no, si es así, muestra la pantalla final con puntaje y guarda los puntajes de la trivia ejecutando la función anteriormente mencionada.

### 4. Módulo de Puntajes
- `cargarTabla()`: a esta función le dimos muchas vueltas, intentamos con un solo for y solo 3 resultados, luego con un for dentro de un while, pero después de mucho pensar y ayuda de la IA, llegamos a esta función.
- Esta recibe el `id` de la tabla y la clave del `localStorage` (por ejemplo, `puntajesTrivia`), luego los valores para las celdas y almacena en dos constantes. Después crea una copia de los puntajes existentes en un array con `forEach`, para luego ir comparándolos en otro `for`, con una variable por fuera (`indiceMayor`), que va almacenando el índice del array original que tenga mayor puntaje; a medida que lo va encontrando, lo va sacando del array de copia, así no vuelve a iterar sobre ese puntaje.
- `mostrarTodasLasTablas`: ejecuta la función `cargarTabla` sobre las tres tablas de puntajes.
- Al final ejecutará la función `mostrarTodasLasTablas`.

---

## 📝 Etiquetas de Commits

Para mantener un historial de cambios ordenado, todos los mensajes de commit deben comenzar con alguna de las siguientes etiquetas:

- ✨ **`feat:`** Nuevas características o funcionalidades. _Ejemplo:_ `feat: agrego sistema de puntuación para el juego de cartas`
- 🎨 **`style:`** Cambios en el diseño visual o estilos (CSS). _Ejemplo:_ `style: hago responsivo el menú de navegación con flexbox`
- 📝 **`docs:`** Modificaciones o adiciones en la documentación. _Ejemplo:_ `docs: actualizo la sección de uso de ia en el readme`
- ⚙️ **`refactor:`** Limpieza y orden del código para que sea más fácil de leer, sin cambiar cómo funciona el sitio. _Ejemplo:_ `refactor: ordeno las funciones del juego para que no estén duplicadas`

---

## 💻 Testing & Debugging

#### CASO TESTIGO #3
- Sele 21 años

#### OPINIÓN GENERAL DEL SITIO
- _Amigable a la vista y fácil de entender que es un sitio de juegos_
- _Me gustó mucho la fuente principal_

#### CINCUENTA
- _Me gustó, cuando jugué sola me pareció bastante fácil, pero después probamos jugar de a dos y cambió la dificultad_
- _Me gusta la animación de los dados_

#### POKETRIVIA
- _Muy divertido, las preguntas son difíciles si no conocés de Pokemon_
- _Me gustan las fotos de los Pokemones y que puedas elegir_

#### INFILTRADO
- _Me encantó la temática de mascotas y gatitos_
- _Es medio difícil las primeras rondas hasta que le cazas la onda_

---

### Testing
#### CASO TESTIGO #2
- Thali 26 años

#### OPINIÓN GENERAL DEL SITIO
- _El footer gris queda feo, pónganlo negro o algo asi_
- _Poner Bienvenidx_
- _Cambiar "clavá"_ 
- _Poketrivia no está justificado_
- _En el menú de arriba está primero el infiltrado y debería estar Poketrivia_

#### CINCUENTA
- _Puede haber una frase como "¿Quién cocina esta noche? El que pierda un cincuenta" o "juguemos un cincuenta para decidir tal cosa"_
- _"se tiran los dados, y:"_
- _En una primera impresión, el texto de victoria parece desconectado y pensé que no decía cómo ganar_

#### POKETRIVIA
- _Se le puede agregar un timer_

#### INFILTRADO
- _Sumar "entre" 12 puntos entre todas las cartas para abrir la pecera_
- _Las instrucciones están escritas en neutro mientras que los otros juegos en criollo_

#### SOBRE NOSOTROS
- _No entendí si la información debe ser de los desarrolladores o del sitio. En la sección de "El grupo" no hablan del grupo, el texto es sobre el sitio._

---

#### CASO TESTIGO #1
- Siro 18 años

#### OPINIÓN GENERAL DEL SITIO
- _Muy buenos los colores por cada juego._
- _Donde dice: Hola (Tu nombre)…quiero poner mi nombre._
- _Mejor que cada rectángulo diga el nombre del juego, en lugar del genérico DADOS, CARTAS..ETC_
- _Implementado! Se cambió a los nombres de cada juego y se cambió el mensaje de bienvenida._

#### CINCUENTA
- _De 1 solo jugador es aburrido_
- _A partir de 2 se pone bueno_
- _Que diga el turno de quién es màs grande_

#### POKETRIVIA
- _Muy divertido_
- _Propuesta, que marque con color la respuesta correcta._
- _Implementado! Agregué que siempre se responda se muestre la opción correcta, se haya respondido bien o no; en el caso de responder mal, la respuesta elegida se muestra roja._

#### INFILTRADO
- _Aunque perdí al comienzo por el tiempo… Es muy simple y fácil de ganar_
- _Está buena la tensión pero sería mejor tener que generar sólo 12 puntos._

---

### Debugging

### 1. 29/9

- **`Condición inicial:`** El juego se termina y todos los jugadores tienen su puntaje final
- **`Acción:`** Presionar el botón "comenzar juego" después de finalizar una ronda
- **`Resultado esperado:`** Vuelve a comenzar la partida desde 0 y el puntaje anterior se guarda en el localStorage.
- **`Resultado observado:`** El programa reescribe los datos anteriores, acumulando a los jugadores. Sin posibilidad de volver a jugar porque el boton se encuentra deshabilitado.
- **`Solución:`** Sacar los dos eventListeners que estaban dentro del function.

---

## 🗃️ API utilizada

- _PokeApi: "Todos los datos de Pokémon que necesitarás en un solo lugar, fácilmente accesible a través de una moderna API RESTful gratuita de código abierto."_
- Esta API conserva toda la data de Pokemon, siendo actualizada por cada lanzamiento nuevo en la franquicia.
- Esta API es una de las más completas porque de ella extraemos el nombre del pokemon y su _sprite_ (imagen pixelada) para utilizar en la trivia. 

---

## 🤖 Declaración de uso de IA

#### Clara Fernandez Rolon
- Utilicé ayuda de la IA Ecosia y la IA Gemini para ayudarme a optimizar el código en algunas funciones y mejoras en el estilo. La usé teniendo en cuenta que muchas veces ofrece cosas que no vimos, por eso para la lógica prefiero no usarla tanto. Para los estilos si admití algunas características de por ejemplo cursor, que no vimos específicamente, pero me parecieron adecuadas para que el sitio quede más dinámico.

#### Fabrizio Cárdenas
- Utilicé la IA Gemini como asistente durante el desarrollo del proyecto. En el código JavaScript, la empleé para identificar y corregir errores (listeners de eventos duplicados al reiniciar la partida y manejo de sincronización con el DOM), y para mejorar la lógica del cambio de turnos. En cuanto a HTML y CSS, me ayudó a detectar fallas de semántica y anidamiento, y a diseñar un sistema visual más claro. Agregando resaltado tipográfico, clases para el jugador activo en la tabla de puntajes y animaciones con @keyframes para la interfaz.

#### Marcela Marcolini
- Utilicé la IA Gemini para optimizar la funcionalidad del java script del juego de cartas, me brindó una serie de propuestas que tuve que simplificar, generalmente sugiere el uso de GetElementById para lo que le pido que me proponga las funciones con document.querySelector, también sugiere algunas otras funciones que no hemos visto y no conozco, así que debo repreguntar varias veces y ser muy específica en lo que quiero que use. También la utilicé para trabajar un poco los estilos y para arreglar código css al momento de unificar los estilos de las páginas de dados y poketrivia.

---

## 🌐 Validación de Código W3C
Para garantizar la calidad del código, el correcto renderizado multiplataforma y la accesibilidad del sitio web, se realizó la verificación y validación sintáctica de todos los documentos HTML5 y hojas de estilo CSS3 utilizando las herramientas oficiales del World Wide Web Consortium (W3C)

- HTML5: [Verificado mediante el W3C Markup Validation Service.](https://validator.w3.org/)
- CSS3: [Verificado mediante el W3C CSS Validation Service.](https://jigsaw.w3.org/css-validator/)

- ### Resultados del proceso
- Se corrigieron los errores semánticos y de estructura detectados (tales como anidamientos no válidos, etiquetas redundantes de cierre y la jerarquía de los encabezados `<h1>`-`<h6>`), logrando un marcado limpio y conforme a los estándares actuales.
- Las hojas de estilo pasaron el proceso de validación sin errores de sintaxis, garantizando el uso correcto de propiedades de Flexbox, pseudo-clases y animaciones @keyframes.
_Nota: Siguiendo las políticas actuales del W3C, que ya no otorga sellos digitales de validación, la conformidad con el estándar se constata directamente mediante la ejecución exitosa de los validadores sin errores sintácticos reportados._
