<?php
//Recogemos el personaje elegidopor el usuario
$miimagen=$_POST["personaje"];

//Según sea el personaja devolvemos una u otra url
  switch ($miimagen)
  {
     case "mikuhatsune":
       echo "miku_Hatsune.jpg";
	   break;
     case "doraemon":
       echo "doraemon.jpg";	
	   break;
     case "sesshomaru":
       echo "sesshomaru.jpg";	
       break;
      case "sakura":
       echo "sakura.jpg";
          break;
     default:
        echo "";
  }
?>