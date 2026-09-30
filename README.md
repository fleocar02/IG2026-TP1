# 🕹️ JUEGAZOS

## 👥 Integrantes del Grupo
* [Marcolini, Marcela](https://github.com/Marce-Marcolini)
* [Fernandez Rolon, Clara](https://github.com/clarafernandezr)
* [Cárdenas, Fabrizio](https://github.com/fleocar02)

## 📚 Datos de la Materia
* Informática General
* 2026 / Segundo Cuatrimestre
* UNA Artes Multimediales
* Valeria Drelichman | Pedro Paleo | Leonardo Nadel | Norma Morales

 ---
 
## 📝 Etiquetas de Commits
Para mantener un historial de cambios ordenado, todos los mensajes de commit deben comenzar con alguna de las siguientes etiquetas:

* ✨ **`feat:`** Nuevas características o funcionalidades. *Ejemplo:* `feat: agrego sistema de puntuación para el juego de cartas`
* 🎨 **`style:`** Cambios en el diseño visual o estilos (CSS). *Ejemplo:* `style: hago responsivo el menú de navegación con flexbox`
* 📝 **`docs:`** Modificaciones o adiciones en la documentación. *Ejemplo:* `docs: actualizo la sección de uso de ia en el readme`
* ⚙️ **`refactor:`** Limpieza y orden del código para que sea más fácil de leer, sin cambiar cómo funciona el sitio. *Ejemplo:* `refactor: ordeno las funciones del juego para que no estén duplicadas`

---

## 💻 Testing & Debugging 

### 2.
* Comportamiento esperado: 
  
* Caso de prueba:
* **`Condición inicial:`**
* **`Acción:`**
* **`Resultado esperado:`**
* **`Resultado observado:`**

* Solución:

### 1. 29/9
* Comportamiento esperado: En el juego de dados, cuando se termina una partida y se quiere comenzar una nueva, el programa debe guardar el puntaje anterior y limpiar el contenedor para el próximo juego.
  
* Caso de prueba:
* **`Condición inicial:`** El juego se termina y todos los jugadores tienen su puntaje final
* **`Acción:`** Presionar el botón "comenzar juego" después de finalizar una ronda
* **`Resultado esperado:`** Vuelve a comenzar la partida desde 0 y el puntaje anterior se guarda en el localStorage.
* **`Resultado observado:`** El programa reescribe los datos anteriores, acumulando a los jugadores. Sin posibilidad de volver a jugar porque el boton se encuentra deshabilitado.

* Solución:

---

## 📜 Proceso

AVANCES HOY:
(Clara)
Finalicé el JS y comenté el código
Agregué el botón reintentar al HTML que antes no lo había implementado
