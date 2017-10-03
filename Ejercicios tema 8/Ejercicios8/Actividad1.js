

		var objetoXHR;
		//1-Instanciar el objeto XMLHttpRequest
		window.onload = function(){			
			objetoXHR = new XMLHttpRequest();
		};
		
		function obtenerDatosServidor(){
			 var nombreElegido = document.getElementById("login"); 
			 //3-Realizar la petición al servidor
			 objetoXHR.open("GET", "http://localhost/compruebaDisponibilidad.php?id="+nombreElegido.value, true); 
			 //4-Ejecutar la función de respuesta.
			 objetoXHR.onreadystatechange = respuesta;
			 objetoXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			 objetoXHR.send(nombreElegido); 
		}
		 
		 //2-Preparar la función de respuesta
		function respuesta(){
		 if ((objetoXHR.readyState==4) && (objetoXHR.status==200)){ 
				var login = document.getElementById("login").value;
				if(objetoXHR.responseText == "SI") {
					document.getElementById("loginComprobar").innerHTML = "El nombre elegido ["+login+"] está disponible";
				}
				else {
					document.getElementById("loginComprobar").innerHTML = "No está disponible el nombre elegido ["+login+"]"+objetoXHR.responseText ;
				}
			
			}
		}
		
		