var celdasX;
			var celdasY;
			var tere;
			var tede;
			var texto;
			var tbody;
			var tableT;
			var zona;
			
			function crear(){
				zona= document.getElementById("zonaDatos");
				tableT = document.createElement("table");
				zona.appendChild(tableT);
				for(var i = 0; i < 21; i++){
					tere= document.createElement("tr");
					tableT.appendChild(tere);
					for(var y = 0; y < 21; y++){
						texto = document.createTextNode(i + "-" + y);
						tede= document.createElement("td");
						tere.appendChild(tede);
						tede.appendChild(texto);
					}
				}
			}
			
			function pintarDentro(){
				document.getElementsByTagName("td").background = "red";
			}
			
			function pintarFuera(){
				document.getElementsByTagName("td").background = "white";
			}