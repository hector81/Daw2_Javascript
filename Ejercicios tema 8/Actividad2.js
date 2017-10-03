

		var peticion_http;
		//1-Instanciar el objeto XMLHttpRequest
		window.onload = function(){			
			peticion_http = new XMLHttpRequest(); //El objeto XMLHttpRequest permite la recepción de respuestas del servidor en formato XML.
			cargarFicheroXML("http://localhost/datosxml.php");//cargamos los datos del xml nada mas cargar la pagina
		};
		
		function cargarFicheroXML(url){
			 //3-Realizar la petición al servidor
			 peticion_http.open("GET", url, true); 
			 //4-Ejecutar la función de respuesta.
			 peticion_http.onreadystatechange = respuesta;
			 peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			 peticion_http.send(null); 
		}
		 
		 //2-Preparar la función de respuesta
		function respuesta(){
		 if ((peticion_http.readyState==4) && (peticion_http.status==200)){ 
				//almacenamos el fichero XML en la variable datos
				  var datosXML = peticion_http.responseXML; 
				  //recorremos el fichero XML mediante DOM
				  //CATALOGo
					var catalogo="";
				//sacar longitud 
				var longitudCD = 0;
				longitudCD= datosXML.documentElement.getElementsByTagName("CD") ;
				  for(i=0;i<26;i++){
						var title,artist, country, company, price, year;
						title = longitudCD[i].getElementsByTagName("TITLE")[0].firstChild.nodeValue;
						artist = longitudCD[i].getElementsByTagName("ARTIST")[0].firstChild.nodeValue;
						country = longitudCD[i].getElementsByTagName("COUNTRY")[0].firstChild.nodeValue;
						company = longitudCD[i].getElementsByTagName("COMPANY")[0].firstChild.nodeValue;
						price = longitudCD[i].getElementsByTagName("PRICE")[0].firstChild.nodeValue;
						year = longitudCD[i].getElementsByTagName("YEAR")[0].firstChild.nodeValue;
						try {
							if(title != "" || artist != "" || country != "" || price != "" || company != "" || year != "" ){
								//mostramos los valores obtenidos
								catalogo +="<b style='color:red;'>CD " + (i+1) + "</b><br/><b>Titulo: " + title +
								"</b><br/>" + "Artista: " + artist + 
								"<br/>" + "Pais: " + country + 
								"<br/>" + "Compañia: " + company + 
								"<br/>" + "Precio: " + price + 
								"<br/>" + "Año: " + year + 
								"<br/>";
								alert("Todos los campos correctos");
								document.getElementById("discosArea").innerHTML = catalogo;
							}
							
						}
						catch(err) {	
							document.getElementById("discosArea").innerHTML = err.message;
													
						}

						
						
						
						
				   }
			
			}
		}