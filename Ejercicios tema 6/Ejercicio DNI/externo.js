/**************************************************************************
Mediante el evento onload, nos aseguramos de que cuando todos los 
  elementos del formulario estén cargados se llamará a la función iniciar
**************************************************************************/
window.onload = function () {
        //---ASIGNAR LOS EVENTOS MEDIANTE EL METODO addEventListener
		document.getElementById("formulario").addEventListener("submit", validar, false);
		document.getElementById("nombre").addEventListener("blur", convertirMayusculas, false);
		document.getElementById("apellidos").addEventListener("blur", convertirMayusculas, false);
		document.getElementById("edad").addEventListener("blur", validarEdad, false);
		document.getElementById("nif").addEventListener("blur", validarNif, false);
		document.getElementById("email").addEventListener("blur", validarEmail, false);
		document.getElementById("provincia").addEventListener("blur", validarProvincia, false);
		document.getElementById("fecha").addEventListener("blur", validarFecha, false);
		document.getElementById("telefono").addEventListener("blur", validarTelefono, false);
		document.getElementById("hora").addEventListener("blur", validarHora, false);
			
		// Al hacer click en el botón de enviar tendrá que llamar a la la función validar que se encargará
		// de validar el formulario.
		// Cuando se pierda el foco de nombre o apellidos se llamará a la función convertirMayusculas.
		// Los eventos de click y de perder el foco lo programamos en la fase de burbujeo (false).
}


/**************************************************************
Asignamos los eventos: de click para el botón enviar
  y de pérdida de foco para los inputs nombre y apellidos.
***************************************************************/
/*
function iniciar(){

}
*/

/************************************************************************************
 Validamos los datos introducidos. Si todos son correctos se envía el formulario,
 en caso contrario se anula su efecto de envío mediante el metodo preventDefault()
 *************************************************************************************/
function validar (eventopordefecto) {
     var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var edad = document.getElementById("edad");
    var nif = document.getElementById("nif");
    var email = document.getElementById("email");
    var provincia = document.getElementById("provincia");
    var fecha = document.getElementById("fecha");
    var telefono = document.getElementById("telefono");
    var hora = document.getElementById("hora");
    var confirmacion = confirm("¿Desea enviar el formulario ?");
	
	//Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
    if (nombre.value == "" || apellidos.value == "" || edad.value == "" || nif.value == "" || email.value == "" ||
            provincia.value == "" || fecha.value == "" || telefono.value == "" || hora.value == "" || confirmacion == false) {
        document.getElementById("errores").innerHTML = "Es necesario completar todos los campos<br>";
        eventopordefecto.preventDefault();
		//---CANCELAMOS EL EVENTO DE ENVÍO POR DEFECTO ASIGNADO AL BOTON DE SUBMIT ENVIAR
        return false;//Salimos de la función devolviendo false.
    }else{
		alert("Todo correcto.");
		return true;
	}
}

/**************************************************************
 * Función llamada cada vez que se pierda el foco en nombre o apellidos, y que convierte
 * el valor introducido a mayúsculas
 ***************************************************************/
function convertirMayusculas() {
    //--CONVERTIR A MAYUSCULAS EL CAMPO NOMBRE
	document.getElementById("nombre").value = document.getElementById("nombre").value.toUpperCase();
	//--CONVERTIR A MAYUSCULAS EL CAMPO APELLIDOS
	document.getElementById("apellidos").value = document.getElementById("apellidos").value.toUpperCase();
}

/**************************************************************
 * Sólo permitimos edades con valores numéricos entre 0 y 105
 ***************************************************************/
function validarEdad() {
    
	var edad = document.getElementById("edad").value;
	
	if(edad < 0 || edad > 105){
		//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "La edad debe estar entre 0 y 105<br>";
		//--PASAR EL FOCO AL CAMPO edad
		document.getElementById("edad").focus();
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("edad").style.border = "5px solid";
        document.getElementById("edad").style.borderColor = "red";
		return false;
	}else{
		// Si llega aquí es que la edad es correcta
		document.getElementById("edad").className="";
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("telefono").style.border = "0px solid";
        document.getElementById("telefono").style.borderColor = "none";	
		return true;
	}
	
}

/**************************************************************
 * Sólo permitimos números de teléfono de 9 dígitos que comiencen
 * por 6 ó por 9
 ***************************************************************/
function validarTelefono() {
    // Comenzará con un 6 ó un 9 y seguirá por 8 dígitos numéricos
	var patron= /^([9|6])([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/; //tambien se puede usar este patron     /^[9|6]\d{8}$/
	var telefono = document.getElementById("telefono").value;
	if(!(patron.test(telefono))){/*--SI EL DATO INTRODUCIDO NO CUMPLE EL PATRÓN DEFINIDO*/
		//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "El teléfono debe tener solo 9 números y empezar por 6 o 9 <br>";
		//--PASAR EL FOCO AL CAMPO telefono
		document.getElementById("telefono").focus();
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("telefono").style.border = "5px solid";
        document.getElementById("telefono").style.borderColor = "red";
		return false;
	}else{
		// Si llega aquí es que el teléfono es correcto
		document.getElementById("telefono").className="";
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("telefono").style.border = "0px solid";
        document.getElementById("telefono").style.borderColor = "none";		
		return true;
	}
	
}

/**********************************************************************
 * Comprobamos el email (caracteres)@(caracteres).(de 2 a 4 caracteres)
 **********************************************************************/
function validarEmail() {
    /* 	Comienza con 2 ó más caracteres alfanuméricos incluidos el guión y el punto, seguido de un símbolo @
		Seguirá con cualquier conjunto de 2 ó más caracteres alfanuméricos incluido el guión y finalizando en un punto.
		Terminará con 2 a 4 caracteres alfanuméricos incluidos el guión
	*/
	var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	//var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
	var email = document.getElementById("email").value
	if (!(patron.test(email))){/*--SI NO SE CUMPLE EL PATRÓN DEFINIDO*/
		//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "El formato de email no es correcto";
		//--PASAR EL FOCO AL CAMPO email
		document.getElementById("email").focus();
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("email").style.border = "5px solid";
        document.getElementById("email").style.borderColor = "red";
		return false;
	}else{
		// Si llega aquí es que el email es correcto
		document.getElementById("email").className="";	
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("email").style.border = "0px solid";
        document.getElementById("email").style.borderColor = "none";
		return true;
	}	
}

/************************************************************************************
 * Comprobamos que el NIF esté compuesto por 8 dígitos, un guión y una letra mayúscula
 *************************************************************************************/
function validarNif() {
    // 8 Números 1 letra de la A-Z en mayúsculas, separados por un guión
	var letras = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E','T'];
	var patron = /^(\d{8})([A-Z]|[a-z])$/;     
	nif = document.getElementById("nif").value.toUpperCase();//LO CONVERTIMOS TODO A MAYUSCULAS
	if(!(patron.test(nif))) {/*--SI NO SE CUMPLE EL PATRÓN DEFINIDO*/
		//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "El formato del nif no es correcto";
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("nif").style.border = "5px solid";
        document.getElementById("nif").style.borderColor = "red";
		//--PASAR EL FOCO AL CAMPO NIF
		document.getElementById("nif").focus();
		return false;
	}else if(nif.charAt(8) != letras[(nif.substring(0, 8))%23]) {//comprobamos que la letra sea correcta
	//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "La letra no es correcta";
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("nif").style.border = "5px solid";
        document.getElementById("nif").style.borderColor = "red";
		//--PASAR EL FOCO AL CAMPO NIF
		document.getElementById("nif").focus();
		return false;
	}else{ 
		// Si llega aquí es que el número del NIF es correcto
		document.getElementById("nif").className="";	
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("nif").style.border = "0px solid";
        document.getElementById("nif").style.borderColor = "none";		
		return true;	
	}
	
}

/************************************************************************
 * Función que comprueba si hemos realizado alguna selección de provincia
 *************************************************************************/
function validarProvincia() {
    var	opcionElegida = document.getElementById("provincia").selectedIndex;
	// Comprueba que la opción seleccionada sea diferente a 0.
	// Si es la 0 es que no ha seleccionado ningún nombre de Provincia.
	if (opcionElegida == null || opcionElegida == 0 ){
		//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "No has seleccionado una provincia";
		//--PASAR EL FOCO AL CAMPO Provincia
		document.getElementById("provincia").focus();
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("provincia").style.border = "5px solid";
        document.getElementById("provincia").style.borderColor = "red";
		return false;
	}else{
		// Si llega aquí es que sí hemos seleccionado alguna provincia
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("provincia").style.border = "0px solid";
        document.getElementById("provincia").style.borderColor = "none";
		return true;
	}	
}

/***********************************************************************************************
 * Función que valida la introducción de un dia entre 1 y 31, un mes entre 1 y 12
 * y un año entre 1000 y 2999. Todo separado por un guión o una barra inclinada, y
 * que permite la introducción de hasta dos dígitos (para el día y el mes) con 0 delante ó  sin él
 ************************************************************************************************/
function validarFecha() {
    /* Debe empezar por 0 (no obligatorio (?)) y un número del 1 al 9, ó por 1 y un dígito decimal, ó por 2 y un
     dígito decimal, ó por 3 y un dígito entre el 0 y el 1.
     A continuación admitirá un guión o una barra inclinada.
     Seguirá con un 0 (no obligatorio) y un dígito entre el 1 y el 9, ó un 1 seguido de dígitos entre el 0 y el 2
     Seguirá con un guión o una barra inclinada, y terminaremos con un dígito entre el 1 y el 2 seguido de 
     3 dígitos numéricos
     */
	 var patron = /^([1][9][0-9][0-9]|[2][0][0-9][0-9])(\/|-)([0][1-9]|[1][0-2])(\/|-)([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])$/;
    valor = document.getElementById("fecha").value;
	if (!(patron.test(valor))) {/*--SI NO SE CUMPLE EL PATRÓN DEFINIDO*/
        //--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "Introduce una fecha con el formato YYYY-MM-DD";
		//--PASAR EL FOCO AL CAMPO fecha
		document.getElementById("fecha").focus();
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("fecha").style.border = "5px solid";
        document.getElementById("fecha").style.borderColor = "red";
        return false;
    } else {
        document.getElementById("errores").innerHTML = "";
		// Si llega aquí es que todo ha sido correcto
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("fecha").style.border = "0px solid";
        document.getElementById("fecha").style.borderColor = "none";
        return true;
    }
}

/***************************************************************************
 Función que comprueba la introducción de una hora entre 01 ó 1 hasta 23,
 y unos minutos entre 01 ó 1 hasta 59. Separados por dos puntos (:)
 ***************************************************************************/
function validarHora() {
	// Comenzamos con un 0 (no obligatorio) y un dígito del 1 al 9, ó un 1 y un dígito numérico, 
	// ó un 2 y un dígito de 0 a 3, continuamos con dos puntos y un dígito entre el 0 y el 5 (no obligatorio)
	// seguido de otro dígito numérico
	var patron=/^([0][1-9]|[1][1-9]|[2][0-3])(\:)([0-5][0-9])$/;
	hora = document.getElementById("hora").value;
	if (!(patron.test(hora))){/*--SI NO SE CUMPLE EL PATRÓN DEFINIDO*/
		//--MOSTRAR EL ERROR
		document.getElementById("errores").innerHTML = "La hora debe tener este formato HH:MM";
		//--PASAR EL FOCO AL CAMPO HORA
		document.getElementById("hora").focus();
		//--ASIGNAR LA CLASE(ESTILO) CORRESPONDIENTE(ERROR) AL CAMPO
		document.getElementById("hora").style.border = "5px solid";
        document.getElementById("hora").style.borderColor = "red";
		return false;        
	}else {
		// Si todo ha sido correcto
        document.getElementById("errores").innerHTML = "";
		//QUITAMOS EL BORDEADO ROJO EN CASO DE HABERSELO PUESTO
		document.getElementById("hora").style.border = "0px solid";
        document.getElementById("hora").style.borderColor = "none";
        return true;
    }
	

}

/*************************************************************************
* Validamos que todos los campos de texto tengan algun valor introducido
*************************************************************************/

//function validarcampostexto(objeto){
	// A esta función le pasamos un objeto (que en este caso es el botón de enviar).
	// Puesto que validarcampostexto(this) hace referencia al objeto dónde se programó ese evento
	// que fue el botón de enviar.
	
//	var formulario = objeto.form;
	// La propiedad form del botón enviar contiene la referencia del formulario dónde está ese botón submit.
	// De esta manera podemos recorrer todos los elementos del formulario, buscando los que son de tipo texto.
	// Para validar que contengan valores.
//	for (var i=0; i<formulario.elements.length; i++){
		//---ELIMINAMOS LA CLASE ERROR QUE ESTUVIERA ASIGNADA A ALGÚN CAMPO.
//		if (/*--SI EL ELEMENTO ES DE TIPO TEXTO Y ESTÁ VACIO*/){
			//--ASIGNAR LA CLASE(ESTILOS) ERROR AL ELEMENTO
//			document.getElementById("errores").innerHTML = "Es necesario completar todos los campos<br>";
			//--PASAR EL FOCO AL ELEMENTO
//			document.getElementById("errores").focus();
			//--MOSTRAR EL ERROR AVISANDO QUE NO PUEDE ESTAR VACIO
//			return false;
//		}
//	}
//	return true;
	// Si sale de la función con esta instrucción es que todos los campos de texto son válidos.
//}


