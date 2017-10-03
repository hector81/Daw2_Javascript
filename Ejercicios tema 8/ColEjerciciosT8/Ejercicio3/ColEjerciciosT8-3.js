

	var peticion_http;
	var elementoSeleccionado = -1;
	var sugerencias = null;
	var cacheSugerencias = {};
	
	//1-Instanciar el objeto XMLHttpRequest
	window.onload = function() {
	  peticion_http = new XMLHttpRequest(); //El objeto XMLHttpRequest permite la recepción de respuestas del servidor en formato XML.
	  // Crear elemento de tipo <div> para mostrar las sugerencias del servidor
	  var crearDIV = document.createElement("div");
	  crearDIV.id = "sugerencias";
	  document.body.appendChild(crearDIV);
	  
	  document.getElementById("municipio").onkeyup = autocompleta;
	  document.getElementById("municipio").focus();
	}
	
	function cargaMUNICIPIOSPHP(texto){
		 //3-Realizar la petición al servidor
		 peticion_http.open('POST', 'http://localhost:8080/Ejercicios8/ColEjerciciosT8/Ejercicio3/autocompletaMunicipios.php?nocache='+Math.random(), true);
		 //4-Ejecutar la función de respuesta.
		 peticion_http.onreadystatechange = respuestaMunicipios;
		 peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		 peticion_http.send('municipio='+encodeURIComponent(texto)); 
	}
	
	//2-Preparar la función de respuesta
	function respuestaMunicipios(texto){
		if ((peticion_http.readyState==4) && (peticion_http.status==200)){
				sugerencias = eval('('+peticion_http.responseText+')');
				if(sugerencias.length == 0) {
					sinResultados();
				}
				else {
				  cacheSugerencias[texto] = sugerencias;
				  actualizaSugerencias();
				}
			  
			}
	}

	

	function autocompleta() {
	  //capturamos evento
	  var eventoTecla = arguments[0] || window.event;
	  var tecla = eventoTecla.keyCode;
	  //si la tecla es
	  if(tecla == 40) { // Flecha Abajo
		if(elementoSeleccionado+1 < sugerencias.length) {
		  elementoSeleccionado++;
		}
		muestraSugerencias();//mostramos el html
	  }
	  else if(tecla == 38) { // Flecha Arriba
		if(elementoSeleccionado > 0) {
		  elementoSeleccionado--;
		}
		muestraSugerencias();//mostramos el html
	  }
	  else if(tecla == 13) { // ENTER o Intro
		seleccionaElemento();
	  }
	  else {
		var texto = document.getElementById("municipio").value;
		
		// Si es la tecla de borrado y el texto es vacío, ocultar la lista
		if(tecla == 8 && texto == "") {
		  borraLista();
		  return;
		}
		
		if(cacheSugerencias[texto] == null) {
		  
		  respuestaMunicipios(texto);
		  cargaMUNICIPIOSPHP(texto);
		  
		}
		else {
		  sugerencias = cacheSugerencias[texto];
		  actualizaSugerencias();
		}
	  }
	}
	
	//mostar el html
	function muestraSugerencias() {
	  var zonaSugerencias = document.getElementById("sugerencias");
	  
	  zonaSugerencias.innerHTML = sugerencias.formateaLista();
	  zonaSugerencias.style.display = 'block';  
	}

	function sinResultados() {
		document.getElementById("sugerencias").innerHTML = "No existen municipios que empiezen con esas letras";
		document.getElementById("sugerencias").style.display = "block";
	}

	function actualizaSugerencias() {
	  elementoSeleccionado = -1;
	  muestraSugerencias();
	}

	function seleccionaElemento() {
	  if(sugerencias[elementoSeleccionado]) {
		document.getElementById("municipio").value = sugerencias[elementoSeleccionado];
		borraLista();
	  }
	}

	

	function borraLista() {
	  document.getElementById("sugerencias").innerHTML = "";
	  document.getElementById("sugerencias").style.display = "none";
	}
	Array.prototype.formateaLista = function() {
	  var codigoHtml = "";

	  codigoHtml = "<ul>";
	  for(var i=0; i<this.length; i++) {
		if(i == elementoSeleccionado) {
		  codigoHtml += "<li class=\"seleccionado\">"+this[i]+"</li>";
		}
		else {
		  codigoHtml += "<li>"+this[i]+"</li>";
		}
	  }
	  codigoHtml += "</ul>";

	  return codigoHtml;
	};