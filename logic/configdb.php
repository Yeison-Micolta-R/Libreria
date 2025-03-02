<?php
$host = "localhost";
$user = "root"; // Cambiar si tienes otro usuario
$pass = ""; // Cambiar si tienes contraseña en MySQL
$dbname = "bibliotrack";

$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>