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

// Animación de aparición al hacer scroll, escalonada entre hermanos
const elementosFade = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window && elementosFade.length) {
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const hermanos = Array.from(
                        entrada.target.parentElement.children
                    ).filter((el) => el.classList.contains("fade-in"));
                    const indice = hermanos.indexOf(entrada.target);
                    entrada.target.style.transitionDelay = `${Math.max(indice, 0) * 90}ms`;
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

// Contador animado para las estadísticas del hero
const statsEstadisticas = document.querySelectorAll(".hero-stats .stat strong");
if ("IntersectionObserver" in window && statsEstadisticas.length) {
    const animarContador = (el) => {
        const textoFinal = el.textContent.trim();
        const numero = parseInt(textoFinal, 10);
        if (Number.isNaN(numero)) return;
        const sufijo = textoFinal.replace(String(numero), "");
        const duracion = 900;
        const inicio = performance.now();
        const paso = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            const valorActual = Math.round(numero * progreso);
            el.textContent = `${valorActual}${sufijo}`;
            if (progreso < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
    };

    const observadorStats = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    animarContador(entrada.target);
                    observadorStats.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    statsEstadisticas.forEach((el) => observadorStats.observe(el));
}
