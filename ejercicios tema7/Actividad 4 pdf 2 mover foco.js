//funcion
function pasarFoco(numero) {
		//comprueba el evento y que sea intro
	if(event.keyCode == 13){
		var nodo=document.getElementsByTagName( "input" )[numero];
		var nodoSiguiente = nodo.nextSibling;
		//nodoSiguiente.nextSibling.style.backgroundColor = "red";
		nodoSiguiente.nextSibling.focus();		
	}	
}

function comprobarCampos(){
	var nombre = document.getElementById("f1").value;
	var apellidos = document.getElementById("f2").value;
	var provincia = document.getElementById("f3").value;
	
	if(nombre == "" || apellidos == "" || provincia == ""){
		return false;//esto es para que si hay algun campo vacio no ejecute el metodo action
		
	}
	
	return true;//si esta todo relleno enviaria el action
}