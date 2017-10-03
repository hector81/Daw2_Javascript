var numeroGuardado1 = "";
var numeroGuardado2 = "";
var simbolo = "";

function ponerNumero(evento) {
	//capturamos el interior del div
	var numero = parseInt(evento.firstChild.nodeValue);
	var pantalla = document.getElementById("textoPantalla");//para pantalla
	pantalla.innerHTML += numero;//lo introducimos
}

function borrar() {
	var pantalla = document.getElementById("textoPantalla");//para pantalla
	pantalla.innerHTML = "0"; //introducimos 0
}

function operacion(evento) {
	//capturamos el interior del div
	simbolo = evento.firstChild.nodeValue;
	var pantalla = document.getElementById("textoPantalla");//para pantalla
	//guardamos el primer numero
	numeroGuardado1 = parseInt(pantalla.firstChild.nodeValue);
	//ponemos en pantalla
    pantalla.firstChild.nodeValue = "";//si no lo ponemos "" daría errores, tiene que coger el 2º numero

}

function resultado() {
	var pantalla = document.getElementById("textoPantalla");//para pantalla
	//sacamos el segundo hijo
	var numeroGuardado2 = parseInt(pantalla.firstChild.nodeValue);

	if (simbolo == "*") {
		pantalla.innerHTML = (numeroGuardado1 * numeroGuardado2);
	} else if (simbolo == "/") {
		pantalla.innerHTML = (numeroGuardado1 / numeroGuardado2);
	} else if (simbolo == "+") {
		pantalla.innerHTML = (numeroGuardado1 + numeroGuardado2);
	} else {
		pantalla.innerHTML = (numeroGuardado1 - numeroGuardado2);
	}
		
}

