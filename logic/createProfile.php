<?php
require '../logic/configdb.php'; // Archivo de conexión a la BD

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir y limpiar los datos del formulario
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $password_repeat = trim($_POST["password_repeat"]);

    // Validar que los campos no estén vacíos
    if (empty($username) || empty($email) || empty($password) || empty($password_repeat)) {
        echo "Todos los campos son obligatorios.";
        exit();
    }

    // Validar que las contraseñas coincidan
    if ($password !== $password_repeat) {
        echo "Las contraseñas no coinciden.";
        exit();
    }

    // Hash de la contraseña
    $password_hashed = password_hash($password, PASSWORD_BCRYPT);

    // Insertar en la base de datos
    $sql = "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password_hashed);

    if ($stmt->execute()) {
        header("refresh:0.5; url=../Pages/index.html"); // Redirige tras 2 segundos
    } else {
        echo "Error en el registro: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>