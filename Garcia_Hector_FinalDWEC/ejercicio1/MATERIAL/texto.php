<?php
header ("Content-Type: text/plain; charset=iso-8859-1"); //Solucionar acentos

//Recogemos el personaje elegido por el usuario.
$mitexto=$_POST["personaje"];

//Según elpersonaje devolveremos un texto u otro
   switch ($mitexto)
   {
      case "mikuhatsune":
	     echo "<p>Primera cantante holograma. Tiene 16 años y el pelo color turquesa.  </p>";
	     break;
	  case "doraemon":
	     echo "<p> Es el protagonista de la serie con su mismo nombre. Es un gato robot sin orejas.</p>";
		 break;
	  case "sesshomaru":
	     echo "<p> Es un demonio puro. Tiene el pelo largo y plateado. </p>";
		 break;
	  case "sakura":
	     echo "<p> Personaje extremadamente energica y alegre. Pertenece a la familia Kimoto. </p>";
		 break;
	  default:
	     echo "<p> No hay ningun personaje elegido. </p>";
		 
   }
?>