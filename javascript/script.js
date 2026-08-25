const boton = document.getElementById("btnProyectos");
const mensaje = document.getElementById("mensaje");
const proyectos = document.getElementById("proyectos");

const formulario = document.getElementById("formulario-contacto");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensajeContacto = document.getElementById("mensaje-contacto");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");

const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const btnTema = document.getElementById("btnTema");

// BOTÓN DE PROYECTOS

boton.addEventListener("click", function () {

    mensaje.textContent = "¡Gracias por visitar mi portafolio!";

    boton.textContent = "¡Gracias por visitarme!";

    proyectos.scrollIntoView({
        behavior: "smooth"
    });

});


// FORMULARIO

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    let formularioValido = true;

    if (!validarCampo(nombre)) {

        errorNombre.textContent = "El nombre es obligatorio.";
        errorNombre.className = "mensaje mensaje-error";

        formularioValido = false;

    }

    if (!validarCampo(email)) {

        errorEmail.textContent = "El correo es obligatorio.";
        errorEmail.className = "mensaje mensaje-error";

        formularioValido = false;

    } else if (!formatoEmail.test(email.value)) {

        errorEmail.textContent = "Ingresa un correo válido.";
        errorEmail.className = "mensaje mensaje-error";

        formularioValido = false;

    }

    if (!validarCampo(mensajeContacto)) {

        errorMensaje.textContent = "El mensaje es obligatorio.";
        errorMensaje.className = "mensaje mensaje-error";

        formularioValido = false;

    }

    if (formularioValido) {

        alert("¡Mensaje enviado correctamente!");

        formulario.reset();

        nombre.className = "";
        email.className = "";
        mensajeContacto.className = "";

        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorMensaje.textContent = "";

    }

});


// VALIDAR CAMPO

function validarCampo(campo) {

    if (campo.value.trim() === "") {
        return false;
    }

    return true;

}


// VALIDAR EMAIL MIENTRAS ESCRIBES

email.addEventListener("input", function () {

    if (email.value === "") {

        errorEmail.textContent = "";
        errorEmail.className = "";
        email.className = "";

        return;
    }

    if (!formatoEmail.test(email.value)) {

        errorEmail.textContent = "El correo no parece válido.";
        errorEmail.className = "mensaje mensaje-error";

        email.className = "campo-error";

    } else {

        errorEmail.textContent = "";
        errorEmail.className = "";

        email.className = "campo-valido";

    }
});
nombre.addEventListener("input", function () {

    if (validarCampo(nombre)) {

        errorNombre.textContent = "";
        errorNombre.className = "";

        nombre.className = "campo-valido";

    } else {

        nombre.className = "campo-error";

    }

});
mensajeContacto.addEventListener("input", function () {

    if (validarCampo(mensajeContacto)) {

        errorMensaje.textContent = "";
        errorMensaje.className = "";

        mensajeContacto.className = "campo-valido";

    } else {

        mensajeContacto.className = "campo-error";

    }

});
btnTema.addEventListener("click", function () {

    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {

        btnTema.textContent = "Modo claro";

        localStorage.setItem("tema", "oscuro");

    } else {

        btnTema.textContent = "Modo oscuro";

        localStorage.setItem("tema", "claro");

    }

});


const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {

    document.body.classList.add("modo-oscuro");

    btnTema.textContent = "Modo claro";

}