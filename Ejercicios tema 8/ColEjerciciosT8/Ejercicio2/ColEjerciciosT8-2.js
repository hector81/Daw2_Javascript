

		var peticion_http;
		//1-Instanciar el objeto XMLHttpRequest
		window.onload = function(){			
			peticion_http = new XMLHttpRequest(); //El objeto XMLHttpRequest permite la recepción de respuestas del servidor en formato XML.
			cargaProvinciasJSON("http://localhost:8080/Ejercicios8/ColEjerciciosT8/Ejercicio2/cargaProvinciasJSON.php");//cargamos los datos del xml nada mas cargar la pagina
			document.getElementById("provincia").onchange = cargaMunicipiosJSON;
		};

		function cargaProvinciasJSON(url){
			 //3-Realizar la petición al servidor
			 peticion_http.open("GET", url, true); 
			 //4-Ejecutar la función de respuesta.
			 peticion_http.onreadystatechange = respuestaProvincias;
			 peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			 peticion_http.send(null); 
		}
		
		function cargaMunicipiosJSON(){
			//cogemos la provincia elegida arriba
			var listaPROVINCIAS = document.getElementById("provincia");
			var provincia = listaPROVINCIAS.options[listaPROVINCIAS.selectedIndex].value;
		   //3-Realizar la petición al servidor
		   peticion_http.open("POST", "http://localhost:8080/Ejercicios8/ColEjerciciosT8/Ejercicio2/cargaMunicipiosJSON.php?nocache=" + Math.random(), true);
		   //4-Ejecutar la función de respuesta.
		   peticion_http.onreadystatechange = respuestaMunicipios;
		   peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		   peticion_http.send("provincia=" + provincia);
	   
		}

		
		 
		 //2-Preparar la función de respuesta
		function respuestaProvincias(){
		 if ((peticion_http.readyState==4) && (peticion_http.status==200)){
				  //convertimos la respuesta a un objeto JSON para acceder a él
				  var provinciasJSON = eval('(' + peticion_http.responseText + ')');
				  //SACAMOS LA lista provincia del id del select
				  var listaPROVINCIAS = document.getElementById("provincia");

				  listaPROVINCIAS.options[0] = new Option("Seleccionar provincia");
				  var i=1;
				  for(var codigo in provinciasJSON) {
					listaPROVINCIAS.options[i] = new Option(provinciasJSON[codigo], codigo);
					i++;
				  } 
			}	
		}
		 
		//2-Preparar la función de respuesta
		function respuestaMunicipios(){
			if ((peticion_http.readyState==4) && (peticion_http.status==200)){ 
				//convertimos la respuesta a un objeto JSON para acceder a él
			    var municipiosJSON = eval('(' + peticion_http.responseText + ')');
				//SACAMOS LA lista municipios del id del select
			    var listaMUNICIPIOS = document.getElementById("municipio");

			    listaMUNICIPIOS.options.length = 0;
			    var i=0;
			    for(var codigo in municipiosJSON) {
					listaMUNICIPIOS.options[i] = new Option(municipiosJSON[codigo], codigo);
					i++;
				}
			}
		}