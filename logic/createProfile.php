<?php
// Configuración de la base de datos
$host = "localhost";
$dbname = "tu_base_de_datos";
$username = "tu_usuario";
$password = "tu_contraseña";

try {
    // Conectar a la base de datos con PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si la solicitud es POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Obtener y sanitizar los datos del formulario
        $user = trim($_POST["inputName"]);
        $email = trim($_POST["inputEmail"]);
        $pass = $_POST["inputPassword"];
        $passRepeat = $_POST["inputPasswordRepeat"];

        // Verificar que las contraseñas coincidan
        if ($pass !== $passRepeat) {
            echo json_encode(["success" => false, "error" => "Las contraseñas no coinciden."]);
            exit;
        }

        // Encriptar la contraseña
        $hashedPassword = password_hash($pass, PASSWORD_BCRYPT);

        // Insertar los datos en la base de datos
        $stmt = $pdo->prepare("INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)");
        $stmt->bindParam(":username", $user);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Error al registrar el usuario."]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Método no permitido."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Error de conexión: " . $e->getMessage()]);
}

// Redirigir de nuevo al formulario después de completar el proceso
header("Location: /Pages/index.html");
exit;
?>