<?php
include("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $author = $_POST["author"];
    $progress = $_POST["progress"];
    $rating = $_POST["rating"];

    $query = "INSERT INTO libros (titulo, autor, progreso, calificacion) VALUES ('$title', '$author', '$progress', '$rating')";

    if (mysqli_query($conn, $query)) {
        echo "success";
    } else {
        echo "error";
    }

    mysqli_close($conn);
}
?>