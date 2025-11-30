document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector("#form-registro");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const email2 = document.getElementById("email_2").value.trim();
        const contrasenna = document.getElementById("password").value;
        const contrasenna2 = document.getElementById("password_2").value;

        const errores = []

        if (email === "" ||
            email.length > 100 ||
            !(email.endsWith("@duoc.cl") ||
                email.endsWith("@profesor.duoc.cl") ||
                email.endsWith("@gmail.com"))
        ) {
            errores.push("Ingrese un correo válido. Debe terminar en @duoc.cl / @profesor.duoc.cl / @gmail.com")
        }

        if (email != email2) {
            errores.push("Ambos correos deben ser idénticos para confirmar")
        }

        if (contrasenna === "" ||
            contrasenna.length < 4 ||
            contrasenna.length > 10
        ) {
            errores.push("Las contraseñas deben ser idénticas para confirmarse")
        }

        if (!contrasenna === contrasenna2) {
            errores.push("Las contraseñas deben ser idénticas para confirmarse")
        }

        if (errores.length == 0) {
            window.location.href = "/pages/home.jsx";
        } else {
            alert(errores.join("\n"))
        }
    }
    )
}
)