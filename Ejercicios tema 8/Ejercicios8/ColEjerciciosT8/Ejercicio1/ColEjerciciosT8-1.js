

		var peticion_http;
		//1-Instanciar el objeto XMLHttpRequest
		window.onload = function(){			
			peticion_http = new XMLHttpRequest(); //El objeto XMLHttpRequest permite la recepción de respuestas del servidor en formato XML.
			cargaProvinciasXML("http://localhost/Ejercicios8/ColEjerciciosT8/Ejercicio1/cargaProvinciasXML.php");//cargamos los datos del xml nada mas cargar la pagina
			document.getElementById("provincia").onchange = cargaMunicipiosXML;
		};

		function cargaProvinciasXML(url){
			 //3-Realizar la petición al servidor
			 peticion_http.open("GET", url, true); 
			 //4-Ejecutar la función de respuesta.
			 peticion_http.onreadystatechange = respuestaProvincias;
			 peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			 peticion_http.send(null); 
		}
		
		function cargaMunicipiosXML(){
			//cogemos la provincia elegida arriba
			var listaPROVINCIAS = document.getElementById("provincia");
			var provincia = listaPROVINCIAS.options[listaPROVINCIAS.selectedIndex].value;
		   //3-Realizar la petición al servidor
		   peticion_http.open("POST", "http://localhost/Ejercicios8/ColEjerciciosT8/Ejercicio1/cargaMunicipiosXML.php?nocache=" + Math.random(), true);
		   //4-Ejecutar la función de respuesta.
		   peticion_http.onreadystatechange = respuestaMunicipios;
		   peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		   peticion_http.send("provincia=" + provincia);
	   
		}

		
		 
		 //2-Preparar la función de respuesta
		function respuestaProvincias(){
		 if ((peticion_http.readyState==4) && (peticion_http.status==200)){ 
				  //almacenamos el fichero XML en la variable datos
				  var datosXML = peticion_http.responseXML;
				  //recorremos el fichero XML mediante DOM
				  //CATALOGO PROVINCIAS
				  var listaPROVINCIAS = document.getElementById("provincia");
				  //guarda el dato xml provincias
			      var provincias = datosXML.getElementsByTagName("provincias")[0];
			      var totalProvincias = provincias.getElementsByTagName("provincia");
			      listaPROVINCIAS.options[0] = new Option("Selecciona una provincia");

				  
				  ////mostramos los valores obtenidos
				  for(i=0; i<totalProvincias.length; i++) {
					var codigo = totalProvincias[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;
					var nombre = totalProvincias[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
					listaPROVINCIAS.options[i+1] = new Option(nombre, codigo);
				  }			  
			}
			
		}
		
		//2-Preparar la función de respuesta
		function respuestaMunicipios(){
		 if ((peticion_http.readyState==4) && (peticion_http.status==200)){ 			  
				  //almacenamos el fichero XML en la variable datos
				  var datosXML = peticion_http.responseXML;
				  //recorremos el fichero XML mediante DOM
				  //CATALOGO PROVINCIAS
				  var lista = document.getElementById("municipio");
				  var municipios = datosXML.getElementsByTagName("municipios")[0];
				  var losMunicipios = municipios.getElementsByTagName("municipio");
			 
				  // Borrar elementos anteriores
				  lista.options.length = 0;
			 
				  // Se utiliza el método de crear elementos Option() y añadirlos a la lista
				  for(i=0; i<losMunicipios.length; i++) {
					var codigo = losMunicipios[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;
					var nombre = losMunicipios[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;
					lista.options[i] = new Option(nombre, codigo);
				  }
				}

			
		}