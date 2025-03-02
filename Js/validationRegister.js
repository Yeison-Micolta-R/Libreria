document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const username = document.getElementById("inputName");
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const passwordRepeat = document.getElementById("inputPasswordRepeat");
    const successMessage = document.getElementById("successMessage");

    function showError(input, message) {
        const errorElement = document.getElementById(`error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
        errorElement.innerHTML = message;
        input.classList.add("is-invalid");
    }

    function clearError(input) {
        const errorElement = document.getElementById(`error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
        errorElement.innerHTML = "";
        input.classList.remove("is-invalid");
    }

    function validateUsername() {
        if (username.value.trim() === "") {
            showError(username, "El nombre de usuario es obligatorio.");
            return false;
        }
        clearError(username);
        return true;
    }

    function validateEmail() {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Ingresa un email válido.");
            return false;
        }
        clearError(email);
        return true;
    }

    function validatePassword() {
        if (password.value.length < 6) {
            showError(password, "La contraseña debe tener al menos 6 caracteres.");
            return false;
        }
        clearError(password);
        return true;
    }

    function validatePasswordRepeat() {
        if (passwordRepeat.value !== password.value) {
            showError(passwordRepeat, "Las contraseñas no coinciden.");
            return false;
        }
        clearError(passwordRepeat);
        return true;
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