<?php

    $conexion = mysqli_connect("localhost", "root" , "", "login_register_db");

    // Verificar la conexión
    if (!$conexion) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    echo 'Conectado exitosamente a la base de datos';

?>

