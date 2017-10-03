

		var objetoXHR;
		//1-Instanciar el objeto XMLHttpRequest
		window.onload = function(){			
			objetoXHR = new XMLHttpRequest();
		};
		
		function obtenerDatosServidor(origen, elemento_destino){
			 var objeto_destino = document.getElementById(elemento_destino); 
			 //3-Realizar la petición al servidor
			 objetoXHR.open("GET", origen, true); 
			 //4-Ejecutar la función de respuesta.
			 objetoXHR.onreadystatechange = respuesta;
			 objetoXHR.send(null); 
		}
		 
		 //2-Preparar la función de respuesta
		function respuesta(){
		 if ((objetoXHR.readyState==4) && (objetoXHR.status==200)){ 
			//objeto_destino.innerHTML = objetoXHR.responseText; 
			alert(objetoXHR.responseText);
			}
		}
		
		