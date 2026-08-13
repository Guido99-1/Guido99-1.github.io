let menuVisible = false;

// Muestra u oculta el menú responsive
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    menuVisible = !menuVisible;
    nav.classList = menuVisible ? "responsive" : "";
}

function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// Formulario de contacto: arma el mensaje y lo abre en WhatsApp (sin backend)
const formContacto = document.getElementById("form-contacto");
if (formContacto) {
    formContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const nombre = document.getElementById("f-nombre").value.trim();
        const contacto = document.getElementById("f-contacto").value.trim();
        const mensaje = document.getElementById("f-mensaje").value.trim();

        const texto =
            `Hola Guido, soy ${nombre}.\n` +
            `Contacto: ${contacto}\n\n` +
            `${mensaje}`;

        const url = `https://wa.me/593969079341?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank", "noopener");
    });
}

// Animación de aparición al hacer scroll
const elementosFade = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window && elementosFade.length) {
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    elementosFade.forEach((el) => observador.observe(el));
} else {
    elementosFade.forEach((el) => el.classList.add("visible"));
}
