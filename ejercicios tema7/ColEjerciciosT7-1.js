//funcion
function mostrarArbolDom() {	
	//obtenemos el nodo body para descender sobre el
	var nodoBody = document.body;
	//obtenemos el numero de nodos hijos
	var numeroHijos = nodoBody.childNodes.length;
	//recorremos todos los nodos
	for (i = 0; i < numeroHijos; i++) {
		if(nodoBody.childNodes[i].nodeName != '#text'){
			alert('El nodo ' + i); 
			alert('Etiqueta: ' + nodoBody.childNodes[i].nodeName);
			alert('Tipo de NODO: ' + nodoBody.childNodes[i].nodeType);
			alert('Valor del NODO : ' + nodoBody.childNodes[i].textContent );
			alert('Valor del NODO : ' + nodoBody.childNodes[i].nodeValue );
		}
		

	}
}
