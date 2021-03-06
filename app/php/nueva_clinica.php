<?php
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
/* Database connection information */
include("mysql.php" );



/*
 * Local functions
 */

function fatal_error($sErrorMessage = '') {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
    die($sErrorMessage);
}

/*
 * MySQL connection
 */
if (!$gaSql['link'] = mysql_pconnect($gaSql['server'], $gaSql['user'], $gaSql['password'])) {
    fatal_error('Could not open connection to server');
}

if (!mysql_select_db($gaSql['db'], $gaSql['link'])) {
    fatal_error('Could not select database ');
}

mysql_query('SET names utf8');



/*
 * SQL queries
 * Get data to display
 */

$id = $_POST["id_clinica"];
$nombre = $_POST["nombre"];
$razonsocial = $_POST["razonSocial"]
$localidad = $_POST["localidad"];
$provincia = $_POST["provincia"];
$direccion = $_POST["direccion"];
$cp = $_POST["cp"];
$id_tarifa = $_POST["id_tarifa"];
$numClinica = $_POST["numClinica"]
$cif = $_POST["cif"];

/* Consulta INSERT */
$query = "UPDATE clinicas SET 
            nombre = '" . $nombre . "', 
            localidad = '" . $localidad . "', 
            provincia = '" . $provincia . "', 
            direccion = '" . $direccion . "', 
            cp = '" . $cp . "',
            id_tarifa = '" . $id_tarifa . "',
            cif = '" . $cif . "'
            WHERE id_clinica = " . $id;

$query = "INSERT INTO clinicas(id_clinica, nombre, razonsocial, cif, localidad, provincia, direccion, cp, numclinica, id_tarifa) 
VALUES ($id, $nombre, $razonsocial, $cif, $localidad, $provincia, $direccion, $cp , $numClinica, $id_tarifa )"

//mysql_query($query, $gaSql['link']) or fatal_error('MySQL Error: ' . mysql_errno());
/*En función del resultado correcto o no, mostraremos el mensaje que corresponda*/
$query_res = mysql_query($query);

// Comprobar el resultado
if (!$query_res) {
    $mensaje  = 'Error en la consulta: ' . mysql_error() . "\n";
    $estado = mysql_errno();
}
else
{
    $mensaje = "Actualización correcta";
    $estado = 0;
}
$resultado = array();
 $resultado[] = array(
      'mensaje' => $mensaje,
      'estado' => $estado
   );
echo json_encode($resultado);
?>
