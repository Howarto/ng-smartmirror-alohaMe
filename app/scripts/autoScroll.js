var SENTIDO = 1;
var STEP = 10;

var aux = -1;

window.setInterval(function() {
  var elem = document.getElementById('feed');
  if (elem.scrollTop === aux) {
    SENTIDO *= -1;
    console.log("Paso por la funcion setInterval");
  }
  aux = elem.scrollTop;
  elem.scrollTop += STEP*SENTIDO;
}, 750);
