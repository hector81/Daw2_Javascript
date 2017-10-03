<?php
	$login = $_GET["id"];
	$COMPROBAR = false;
	
	$arrayNombres = array("Hector","Ruben","Aida","Isabel","Daniel","Aitor","Angel");
	
	foreach ($arrayNombres as $valor) {
		if($valor == $login){
			$COMPROBAR = true;
			break;
		}else{
			$COMPROBAR = false;
		}
	}
	
	if($COMPROBAR == true){
		echo "SI";
	}else{
		echo "NO";
	}
	

?>