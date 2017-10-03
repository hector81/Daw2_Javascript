

		var peticion_http;
		//1-Instanciar el objeto XMLHttpRequest
		window.onload = function(){			
			peticion_http = new XMLHttpRequest(); //El objeto XMLHttpRequest permite la recepción de respuestas del servidor en formato XML.
			cargarFicheroJSON();//cargamos los datos del xml nada mas cargar la pagina
		};

		function cargarFicheroJSON(){
			 //3-Realizar la petición al servidor
			 peticion_http.open("GET", "http://localhost/Ejercicios8/datosjson.php", true); 
			 //4-Ejecutar la función de respuesta.
			 peticion_http.onreadystatechange = respuesta;
			 peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			 peticion_http.send(null); 
		}
		 
		 //2-Preparar la función de respuesta
		function respuesta(){
		 if ((peticion_http.readyState==4) && (peticion_http.status==200)){ 
				//almacenamos el fichero de texto recibido en la vble resJSON
				  var resJSON = peticion_http.responseText;
				  //convertimos la respuesta a un objeto JSON para acceder a él
				  //var datosJSON = eval("("+this.resJSON+")");
				  datosJSON = JSON.parse(resJSON);
				  //se debe añadir paréntesis al principio y final para la conversión 
				  //utilizamos la notación de puntos para acceder a la información
	
				  var acumulado = "" ;
				  alert(datosJSON);
				  for(i=0;i<datosJSON.length;i++){
						var nombreCentro1 = datosJSON[i].nombrecentro;
						var localidad1 = datosJSON[i].localidad;
						var provincia1 = datosJSON[i].provincia;
						var telefono1 = datosJSON[i].telefono;
						var fechavisita1 = datosJSON[i].fechavisita;
						var numvisitantes1 = datosJSON[i].numvisitantes;
						//acumulamos
						  acumulado += "<br><br>Nombre centro: " + nombreCentro1 +
							"<br/>" + "Localidad: " + localidad1 +
							"<br/>" + "Provincia: " + provincia1 + 
							"<br/>" + "Telefono: " + telefono1 +
							"<br/>" + "Fecha visita: " + fechavisita1 +
							"<br/>" + "Número visitantes: " + numvisitantes1 + "<br>";
					  
				  }
				  
				//mostramos los valores obtenidos
				  document.getElementById("ListaLugares").innerHTML = acumulado;
	
			}
		}
		
		
		
		
		