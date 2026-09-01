const boton = document.getElementById("btnProyectos");
const mensaje = document.getElementById("mensaje");
const proyectos = document.getElementById("proyectos");

const formulario = document.getElementById("formulario-contacto");
const modalEnlace = document.getElementById("modal-enlace");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensajeContacto = document.getElementById("mensaje-contacto");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");

const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const modal = document.getElementById("modal-proyecto");
const modalImagen = document.getElementById("modal-imagen");

const modalTitulo = document.getElementById("modal-titulo");

const modalDescripcion = document.getElementById("modal-descripcion");

const modalTecnologia = document.getElementById("modal-tecnologia");

const cerrarModal = document.getElementById("cerrar-modal");

const btnCerrarModal = document.getElementById("btn-cerrar-modal");


const contenedorProyectos = document.getElementById("lista-proyectos");
const listaProyectos = [
    {
        nombre: 'Sistema de Gestión de Imprenta "HALO"',
        descripcion: "Sistema para gestionar información y procesos de una imprenta.",
        tecnologia: "HTML, CSS, JavaScript",
        url: "#",
        imagen: "Imagenes/halo.jpg"
    },
    {
        nombre: 'Centro de Rehabilitación y Cuidado Personal "AVALE"',
        descripcion: "Sistema web para gestionar pacientes, citas, inventario y ventas.",
        tecnologia: "HTML, CSS, JavaScript",
        url: "#",
        imagen: "Imagenes/avale.jpeg"
    }
];
listaProyectos.forEach(function (proyecto) {

    const tarjeta = document.createElement("div");

    tarjeta.className = "proyecto";

    tarjeta.innerHTML = `
    <img src="${proyecto.imagen}" alt="${proyecto.nombre}">

    <h3>${proyecto.nombre}</h3>

    <p>${proyecto.descripcion}</p>

    <p>${proyecto.tecnologia}</p>

    <button class="btn-proyecto">Ver proyecto</button>
`;

    const botonProyecto = tarjeta.querySelector(".btn-proyecto");

    botonProyecto.addEventListener("click", function () {

        modalImagen.src = proyecto.imagen;
        modalImagen.alt = proyecto.nombre;

        modalTitulo.textContent = proyecto.nombre;

        modalDescripcion.textContent = proyecto.descripcion;

        modalTecnologia.textContent =
            "Tecnología: " + proyecto.tecnologia;

        modalEnlace.href = proyecto.url;

        modal.style.display = "flex";

    });

    contenedorProyectos.appendChild(tarjeta);

});
cerrarModal.addEventListener("click", function () {

    modal.style.display = "none";

});
btnCerrarModal.addEventListener("click", function () {

    modal.style.display = "none";

});
// BOTÓN DE PROYECTOS

boton.addEventListener("click", function () {

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
modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        modal.style.display = "none";

    }

});