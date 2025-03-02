document.addEventListener("DOMContentLoaded", function () {
    $(".dropdown").hover(
        function () {
            $(this).find(".dropdown-menu").stop(true, true).delay(100).fadeIn(200);
        },
        function () {
            $(this).find(".dropdown-menu").stop(true, true).delay(100).fadeOut(200);
        }
    );

    //Modal
    $(document).ready(function() {
        $("#bookProgress").on("input", function() {
            let value = parseInt($(this).val());
            if (value > 100) {
                $(this).val(100); // Si es mayor a 100, lo ajusta automáticamente
            }
        });
    
        $("#bookForm").submit(function(event) {
            event.preventDefault(); // Evita recargar la página
    
            let title = $("#bookTitle").val();
            let author = $("#bookAuthor").val();
            let progress = Math.min(100, parseInt($("#bookProgress").val())); // Garantiza que no pase de 100
            let rating = $("#bookRating").val() || "No calificado";
    
            $.ajax({
                url: "../logic/add_book.php",
                type: "POST",
                data: {
                    title: title,
                    author: author,
                    progress: progress,
                    rating: rating
                },
                success: function(response) {
                    if (response === "success") {
                        $("#addBookModal").modal("hide");
                        $("#bookForm")[0].reset();

                        // Espera un momento y restablece el formulario
                        setTimeout(() => {
                            $("#bookForm")[0].reset();
                            $("#addBookModal").modal("show"); // Vuelve a abrir el modal
                        }, 500);
    
                        $("#bookList").append(`
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>📕 ${title}</h5>
                                    <p class="mb-1">✍️ Autor: ${author}</p>
                                    <p class="mb-1">📊 Progreso: ${progress}%</p>
                                    <p>⭐ Calificación: ${rating}</p>
                                </div>
                                <button class="btn btn-custom">Editar</button>
                            </div>
                        `);
                    } else {
                        alert("Error al guardar el libro");
                    }
                }
            });
        });
    });
});