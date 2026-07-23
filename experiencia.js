document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ANIMACIONES AL HACER SCROLL
    ====================================== */

    const elementosAnimados = document.querySelectorAll(
        ".animar-izquierda, .animar-derecha, .animar-arriba"
    );

    const observador = new IntersectionObserver(
        (entradas, observer) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    observer.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    elementosAnimados.forEach((elemento) => {

        observador.observe(elemento);

    });


    /* ======================================
       GIRO DE TARJETAS
    ====================================== */

    const tarjetas = document.querySelectorAll(".tarjeta-experiencia");

    tarjetas.forEach((tarjeta) => {

        const botonRevelar = tarjeta.querySelector(".btn-revelar");
        const botonRegresar = tarjeta.querySelector(".btn-regresar-tarjeta");

        if (botonRevelar) {

            botonRevelar.addEventListener("click", () => {

                tarjeta.classList.add("activa");

            });

        }

        if (botonRegresar) {

            botonRegresar.addEventListener("click", () => {

                tarjeta.classList.remove("activa");

            });

        }

    });


    /* ======================================
   BOTÓN VER MÁS / VER MENOS
====================================== */

const botonVerMas = document.querySelector(".btn-ver-mas");
const todasLasTarjetas = document.querySelectorAll(".tarjeta-experiencia");
const cantidadInicial = 4;

/*
Oculta automáticamente todas las tarjetas
que estén después de la número cuatro.
*/

todasLasTarjetas.forEach((tarjeta, indice) => {

    if (indice >= cantidadInicial) {
        tarjeta.classList.add("oculta");
    }

});

if (botonVerMas) {

    const textoBoton = botonVerMas.querySelector("span");
    const tarjetasAdicionales = Array.from(todasLasTarjetas).slice(
        cantidadInicial
    );

    /*
    Si solamente hay cuatro tarjetas o menos,
    el botón no es necesario.
    */

    if (tarjetasAdicionales.length === 0) {

        botonVerMas.style.display = "none";

    } else {

        botonVerMas.addEventListener("click", () => {

            const estaAbierto =
                botonVerMas.classList.contains("abierto");

            if (estaAbierto) {

                tarjetasAdicionales.forEach((tarjeta) => {

                    tarjeta.classList.add("oculta");
                    tarjeta.classList.remove("activa");

                });

                botonVerMas.classList.remove("abierto");

                if (textoBoton) {
                    textoBoton.textContent = "Ver más experiencias";
                }

                document
                    .querySelector("#experiencias")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            } else {

                tarjetasAdicionales.forEach((tarjeta) => {

                    tarjeta.classList.remove("oculta");

                });

                botonVerMas.classList.add("abierto");

                if (textoBoton) {
                    textoBoton.textContent = "Ver menos experiencias";
                }

            }

        });

    }

}


    /* ======================================
       TRANSICIÓN AL REGRESAR
    ====================================== */

    const botonVolver = document.querySelector(".btn-volver");

    if (botonVolver) {

        botonVolver.addEventListener("click", (evento) => {

            evento.preventDefault();

            const destino = botonVolver.getAttribute("href");

            document.body.classList.add("saliendo");

            setTimeout(() => {

                window.location.href = destino;

            }, 450);

        });

    }

});