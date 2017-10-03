/////////////////////////////////////////////////////////
// Función cross-browser generica para crear Eventos
/////////////////////////////////////////////////////////
var crearEvento = function(){
	// Añade eventos en navegadores tipo W3C
	function w3c_crearEvento(elemento, evento, mifuncion){
		elemento.addEventListener(evento, mifuncion, false);
	}
	// Añade eventos en navegadores IE
	function ie_crearEvento(elemento, evento, mifuncion){
		var fx = function(){
			mifuncion.call(elemento); 
		};
		
		// Enlazamos el evento con attachEvent. Cuando usamos attachEvent
		// dejamos de tener acceso al objeto this en mifuncion. Para solucionar eso
		// usaremos el método call() del objeto Function, que nos permitirá
		// asignar el puntero this para su uso dentro de la función. El primer
		// parámetro que pongamos en call será la referencia que se usará como 
		// objeto this dentro de nuestra función. De esta manera solucionamos el problema
		// de acceder a this usando attachEvent en Internet Explorer.
		
		elemento.attachEvent('on' + evento, fx);
	}

	if (typeof window.addEventListener !== 'undefined'){
		return w3c_crearEvento;
	}else if (typeof window.attachEvent !== 'undefined'){
		return ie_crearEvento;
	}
}();	// <= Esta es la parte más crítica - tiene que terminar en () 



//////////////////////////////////////////////////////////////////
// función iniciar -- hace las llamadas al dibujo del tablero
// y además asigna los eventos de click correspondientes.
//////////////////////////////////////////////////////////////////
function iniciar(){	
	// Dibujamos la tabla dónde pintaremos con el ratón //Llama a la funcion dibujarTablero
	dibujarTableroDibujo();
	
	// A la tabla de colores le asignamos el evento de click para seleccionar un color.
	var celdasPintar=document.getElementById("paleta").getElementsByTagName("td");
	for (var i=0;i<celdasPintar.length;i++){
		crearEvento(celdasPintar[i],"click",detectarColorPaleta);
	}
	// Ponemos como color activo de pintura el color de la primer celda.
	// Si estamos usando Internet Explorer
	if (navigator.appName.indexOf("Explorer") != -1){
		// Usaremos className en lugar de classList
		colorActivo = celdasPintar[0].className.split(" ")[0];
	}else
		colorActivo = celdasPintar[0].classList[0];

	// Al tablero de dibujo le asignamos el evento de click para activar o desactivar la pintura..
	var tablero = document.getElementById("tablero");
	var celdasTablero = tablero.getElementsByTagName("td");
	
	for (var i = 0;i<celdasTablero.length;i++){
		crearEvento(celdasTablero[i],"click",activarPintura);
	}


	// Al tablero de dibujo le asignamos los eventos de mouseOver para pintar.
	tablero = document.getElementById("tablero");
	celdasTablero = tablero.getElementsByTagName("td");
	for (var i=0;i<celdasTablero.length;i++){
		crearEvento(celdasTablero[i],"mouseover",pintar);
	}
}


//////////////////////////////////////////////////////////////////
// función dibujarTableroDibujo -- realiza el dibujo del tablero
// y además asigna los eventos de click correspondientes.
//////////////////////////////////////////////////////////////////
function dibujarTableroDibujo(){
	// Vamos creando la estructura de la tabla empleando el árbol de nodos del DOM.
	// Creamos primero el elemento table con todos sus atributos.
	var tabla=document.createElement("table");
	tabla.setAttribute("border","1");
	tabla.setAttribute("id","tablero");
	
	var tituloTabla=document.createElement("caption");
	var contenidoTitulo=document.createTextNode("Haga CLICK en cualquier celda para activar/desactivar el Pincel");
	tituloTabla.appendChild(contenidoTitulo);
	tabla.appendChild(tituloTabla);

	// Ahora crearemos las filas de la tabla y las celdas dentro de cada fila.
	for (var i=1; i<=30; i++){
		var fila=document.createElement("tr");//creamos 30 tr
		for (var j=1;j<=30;j++){
			var celda=document.createElement("td");//dentro de cada tr metemos 30 td
			celda.setAttribute('width', '10px');
		    celda.setAttribute('height', '10px');
		    celda.setAttribute('border', '1');
			fila.appendChild(celda);
		}
		tabla.appendChild(fila);//añadimos las filas a la tabla
	}

	// Una vez que ya tenemos la tabla completamente creada la metemos dentro del DIV zonadibujo.
	document.getElementById("zonadibujo").appendChild(tabla);
	
}


///////////////////////////////////////////////////////////////
// función detectarColorPaleta -- nos permite seleccionar un
// color de pincel en la paleta de colores.
///////////////////////////////////////////////////////////////
function detectarColorPaleta(){
	// Desactivamos la clase seleccionado sobre todas las celdas por si había alguna previamente seleccionada
	// Fijarse que si escribimos la fila con saltos de línea al final de cada fila
	// Tendremos un childNode adicional de tipo texto que contendrá un "\n"
	// De esta forma tenemos ahora 5 nodos hijo de TR
	// Por esa razón hemos puesto la fila de la tabla en el código fuente html toda seguida.
	
	// Revisamos todos los elementos de la tabla colores y si encontramos alguno que tenga
	// más de una clase CSS eliminamos la segunda que es la clase seleccionado
	// Si estamos usando Internet Explorer
	if (navigator.appName.indexOf("Explorer") != -1){
		// Tendremos que usar className en lugar de classList
		colorActivo=this.className;
		this.className = this.className+"seleccionado";
	}else{
		colorActivo=this.classList[0];
		this.classList.add("seleccionado");
	}
}


///////////////////////////////////////////////////////////////
// función activarPintura -- nos permite seleccionar un 
// color y cambiar el mensaje del pincel activado/desactivado
///////////////////////////////////////////////////////////////
function activarPintura(evento){
	if (pintarActivado){
		document.getElementById("pincel").childNodes[0].nodeValue="PINCEL DESACTIVADO";
		pintarActivado=false;
	}else{
		document.getElementById("pincel").childNodes[0].nodeValue="PINCEL ACTIVADO";
		pintarActivado=true;
		// Pintamos dónde hemos hecho click, ya que el resto de cuadros serán pintados
		// cuando se produzca el mouseover.
		
		// Si estamos usando Internet Explorer
		// Tendremos que usar className en lugar de classList
		if (navigator.appName.indexOf("Explorer") != -1)
			this.className=colorActivo;
		else
			this.classList.add(colorActivo);
	}
}


/////////////////////////////////////////////////////////
// función pintar -- nos permite pintar sobre el tablero
/////////////////////////////////////////////////////////
function pintar(evento){
	// Detectar si está pulsado el botón izquierdo del ratón.
	// Y si es así pintar.
	if (pintarActivado){
		// Eliminamos las clases previas asignadas a ese cuadro.
		nuevoColorCambiar = colorActivo;
		// Si estamos usando Internet Explorer
		// Tendremos que usar className en lugar de classList
		if (navigator.appName.indexOf("Explorer") != -1){
			this.className=nuevoColorCambiar;
		}else{
			for (var i=0;i<this.classList.length;i++){
				this.classList.remove(this.classList[i]);
			}
		
			// Pintamos con el color que está activo.
			this.classList.add(nuevoColorCambiar);
		}
	}
}


/////////////////////////////////////////////////////////
// Comienzo de la ejecución del código de JavaScript.
/////////////////////////////////////////////////////////
// Variables globales de la aplicación.
var colorActivo="";
var pintarActivado=false;
// Cuando el documento esté cargado llamamos a la función iniciar().
/////////////////////////////////////////////////////////
crearEvento(window,"load",iniciar);
/////////////////////////////////////////////////////////