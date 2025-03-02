document.getElementById("registerForm").addEventListener("submit", function(event) {
    let valid = true;

    // Obtener valores
    let username = document.getElementById("inputName").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let password = document.getElementById("inputPassword").value.trim();
    let passwordRepeat = document.getElementById("inputPasswordRepeat").value.trim();

    // Limpiar mensajes de error
    document.querySelectorAll(".error-message").forEach(el => el.innerText = "");

    // Validaciones
    if (username.length < 3) {
        document.getElementById("errorName").innerText = "El nombre debe tener al menos 3 caracteres.";
        valid = false;
    }

    if (!email.includes("@")) {
        document.getElementById("errorEmail").innerText = "Ingrese un email válido.";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("errorPassword").innerText = "La contraseña debe tener al menos 6 caracteres.";
        valid = false;
    }

    if (password !== passwordRepeat) {
        document.getElementById("errorPasswordRepeat").innerText = "Las contraseñas no coinciden.";
        valid = false;
    }

    // Si hay errores, no se envía el formulario
    if (!valid) {
        event.preventDefault();
    }

    // Validación en tiempo real
    username.addEventListener("input", validateUsername);
    email.addEventListener("input", validateEmail);
    password.addEventListener("input", validatePassword);
    passwordRepeat.addEventListener("input", validatePasswordRepeat);

    // Validar y enviar con fetch
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        let formData = new FormData(form);

        try {
            let response = await fetch("/logic/createProfile.php", {
                method: "POST",
                body: formData
            });

            let result = await response.json();

            if (result.success) {
                alert("Usuario registrado correctamente.");
                form.reset();
            } else {
                alert(result.error || "Hubo un error al registrar el usuario.");
            }
        } catch (error) {
            alert("Error de conexión con el servidor.");
        }
    });
});