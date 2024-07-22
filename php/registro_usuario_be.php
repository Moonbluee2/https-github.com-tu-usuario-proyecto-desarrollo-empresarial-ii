<?php

include 'conexion_be.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (isset($_POST['nombre_completo'])) {
        // Obtener valores del formulario de registro
        $nombre_completo = $_POST['nombre_completo'];
        $correo = $_POST['correo'];
        $usuario = $_POST['usuario'];
        $contrasena = $_POST['contrasena'];

        // Verificar si el correo o usuario ya están registrados
        $consulta_verificar = "SELECT * FROM usuarios WHERE correo = ? OR usuario = ?";
        $stmt_verificar = mysqli_prepare($conexion, $consulta_verificar);
        mysqli_stmt_bind_param($stmt_verificar, "ss", $correo, $usuario);
        mysqli_stmt_execute($stmt_verificar);

        // Obtener resultados
        $result_verificar = mysqli_stmt_get_result($stmt_verificar);

        if (mysqli_num_rows($result_verificar) > 0) {
            echo "El correo o usuario ya están registrados. Por favor, elige otros.";
        } else {
            // Consulta preparada para mejorar la seguridad
            $query = "INSERT INTO usuarios (nombre_completo, correo, usuario, contrasena) VALUES (?, ?, ?, ?)";

            // Preparar la consulta
            $stmt = mysqli_prepare($conexion, $query);

            // Vincular parámetros
            mysqli_stmt_bind_param($stmt, "ssss", $nombre_completo, $correo, $usuario, $contrasena);

            // Ejecutar la consulta y verificar si se ejecutó correctamente
            $ejecutar = mysqli_stmt_execute($stmt);

            if ($ejecutar) {
                echo "Registro exitoso. ¡Bienvenido, $nombre_completo!";

                // Iniciar sesión automáticamente después del registro
                session_start();
                $_SESSION['usuario'] = $usuario;
                ob_end_clean();  // Limpiar el búfer de salida
                header("Location: /repositorio/https-github.com-tu-usuario-proyecto-desarrollo-empresarial-ii/INICIO.html");  // Usar / para indicar la raíz
                exit();
            } else {
                echo "Error al registrar el usuario: " . mysqli_error($conexion);
            }

            // Cerrar la conexión a la base de datos
            mysqli_close($conexion);
        }
    } elseif (isset($_POST['correo_login'])) {
        // Obtener valores del formulario de inicio de sesión
        $correo = $_POST['correo_login'];
        $contrasena = $_POST['contrasena_login'];

        // Consulta para verificar las credenciales de inicio de sesión
        $consulta_login = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
        $stmt_login = mysqli_prepare($conexion, $consulta_login);
        mysqli_stmt_bind_param($stmt_login, "ss", $correo, $contrasena);
        mysqli_stmt_execute($stmt_login);

        // Obtener resultados
        $result_login = mysqli_stmt_get_result($stmt_login);

        if (mysqli_num_rows($result_login) > 0) {
            // Iniciar sesión
            session_start();
            $_SESSION['usuario'] = $correo;  // Usamos el correo como identificador de sesión
            ob_end_clean();  // Limpiar el búfer de salida
            header("Location: /repositorio/https-github.com-tu-usuario-proyecto-desarrollo-empresarial-ii/INICIO.html");  // Usar / para indicar la raíz
            exit();
        } else {
            echo "Correo o contraseña incorrectos. Intente de nuevo.";
        }

        // Cerrar la conexión a la base de datos
        mysqli_close($conexion);
    }

}
?>
