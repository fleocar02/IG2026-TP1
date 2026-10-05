function cargarTabla(idTabla, claveLocalStorage) {
  //Función cargar tabla que recibe el id de cada tabla y las claves de cada dato en localStorage
  const celdasNombres = document.querySelectorAll(idTabla + " .nombre"); //Recibe los valores para las celdas de nombres y puntos de cada tabla y las almacena
  const celdasPuntos = document.querySelectorAll(idTabla + " .puntos");

  let datosOriginales =
    JSON.parse(localStorage.getItem(claveLocalStorage)) || []; //Recibe los datos del localStorage, si no, crea un array vacío

  let copiaPuntajes = []; //Crea una copia de todos los puntajes existentes y los guarda uno por uno en un array
  datosOriginales.forEach(function (jugador) {
    copiaPuntajes.push(jugador);
  });

  for (let puesto = 0; puesto < 5; puesto++) {
    //Recorre los 5 puestos de la tabla
    if (copiaPuntajes.length > 0) {
      //Pondera si hay datos en el array
      let indiceMayor = 0; //Declara un índiceMayor inicial 0, para luego comparar los puntajes

      copiaPuntajes.forEach(function (jugador, i) {
        if (jugador.puntos > copiaPuntajes[indiceMayor].puntos) {
          //Si el puntaje es mayor al almacenado en indiceMayor, este toma su lugar
          indiceMayor = i;
        }
      });

      celdasNombres[puesto].textContent = copiaPuntajes[indiceMayor].nombre; //Se los agrega a la tabla
      celdasPuntos[puesto].textContent = copiaPuntajes[indiceMayor].puntos;

      copiaPuntajes.splice(indiceMayor, 1); //Se elimina del array de copia para no evaluarlo de nuevo
    }
  }
}

function mostrarTodasLasTablas() {
  //Esta función se encarga de que cargarTabla se ejecute para todos los juegos
  cargarTabla("#tabla-dados", "puntajesDados");
  cargarTabla("#tabla-trivia", "puntajesTrivia");
  cargarTabla("#tabla-cartas", "puntajesCartas");
}

mostrarTodasLasTablas();
