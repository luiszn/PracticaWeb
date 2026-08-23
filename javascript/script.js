const boton = document.getElementById("btnProyectos");
const mensaje = document.getElementById("mensaje");
const proyectos = document.getElementById("proyectos");

boton.addEventListener("click", function () {
    mensaje.textContent = "¡Gracias por visitar mi portafolio!";
    boton.textContent = "¡Gracias por visitarme!";

    proyectos.scrollIntoView({
        behavior: "smooth"
    });
});