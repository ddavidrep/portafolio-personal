/*========================================
              PROYECTOS.JS
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*========================================
          REFERENCIAS DE LOS PROYECTOS
    =========================================*/

    const tarjetas = Array.from(
        document.querySelectorAll(
            ".grid-proyectos .tarjeta-proyecto"
        )
    );

    const botonProyectos = document.getElementById(
        "btn-mostrar-proyectos"
    );

    const textoBoton = botonProyectos?.querySelector("span");

    const contadorProyectos = document.getElementById(
        "contador-proyectos"
    );


    /*========================================
             CONFIGURACIÓN GENERAL
    =========================================*/

    const cantidadInicial = 4;

    const cantidadPorClic = 2;

    let cantidadVisible = cantidadInicial;


    /*========================================
           OBSERVADOR DE ANIMACIONES
    =========================================*/

    const observerAnimaciones = new IntersectionObserver(

        (entradas, observer) => {

            entradas.forEach((entrada) => {

                if (!entrada.isIntersecting) {
                    return;
                }

                entrada.target.classList.add("visible");

                observer.unobserve(entrada.target);

            });

        },

        {
            threshold:0.12,

            rootMargin:"0px 0px -45px 0px"
        }

    );


    /*========================================
       ELEMENTOS GENERALES QUE SE ANIMAN
    =========================================*/

    const elementosAnimados = document.querySelectorAll(

        ".encabezado-seccion, " +

        ".navegador-proyecto, " +

        ".informacion-destacado, " +

        ".contenedor-contacto, " +

        ".marca-footer, " +

        ".mensaje-footer, " +

        ".redes-footer, " +

        ".pie-footer"

    );


    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("revelar");

        observerAnimaciones.observe(elemento);

    });


    /*========================================
        PREPARAR TODAS LAS TARJETAS
    =========================================*/

    tarjetas.forEach((tarjeta) => {

        tarjeta.classList.add("revelar");

    });


    /*========================================
        OBSERVAR TARJETAS QUE SON VISIBLES
    =========================================*/

    function observarTarjetasVisibles() {

        const tarjetasActualmenteVisibles =
            tarjetas.filter((tarjeta) => {

                return !tarjeta.classList.contains("oculta");

            });


        tarjetasActualmenteVisibles.forEach(
            (tarjeta, indiceVisible) => {

                /*
                Retraso alternado para que las dos tarjetas
                de cada fila entren una después de la otra.
                */

                const retraso =
                    (indiceVisible % 2) * 120;

                tarjeta.style.setProperty(
                    "--retraso",
                    `${retraso}ms`
                );


                /*
                Solo observamos tarjetas que todavía
                no hayan sido animadas.
                */

                if (!tarjeta.classList.contains("visible")) {

                    observerAnimaciones.observe(tarjeta);

                }

            }
        );

    }


    /*========================================
           ACTUALIZAR TARJETAS VISIBLES
    =========================================*/

    function actualizarTarjetas() {

        tarjetas.forEach((tarjeta, indice) => {

            const debeMostrarse =
                indice < cantidadVisible;


            tarjeta.classList.toggle(
                "oculta",
                !debeMostrarse
            );


            /*
            Cuando una tarjeta está oculta,
            dejamos de observarla temporalmente.
            */

            if (!debeMostrarse) {

                observerAnimaciones.unobserve(tarjeta);

            }

        });


        const todasVisibles =
            cantidadVisible >= tarjetas.length;


        /*--------------------------------------
                 ACTUALIZAR CONTADOR
        ---------------------------------------*/

        if (contadorProyectos) {

            contadorProyectos.textContent =
                `Mostrando ${Math.min(
                    cantidadVisible,
                    tarjetas.length
                )} de ${tarjetas.length} proyectos`;

        }


        /*--------------------------------------
                  ACTUALIZAR BOTÓN
        ---------------------------------------*/

        if (botonProyectos && textoBoton) {

            if (todasVisibles) {

                textoBoton.textContent =
                    "Ver menos proyectos";

                botonProyectos.classList.add(
                    "modo-menos"
                );

                botonProyectos.setAttribute(
                    "aria-expanded",
                    "true"
                );

            } else {

                textoBoton.textContent =
                    "Ver más proyectos";

                botonProyectos.classList.remove(
                    "modo-menos"
                );

                botonProyectos.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }


        /*
        Esperamos un pequeño momento para que
        el navegador termine de mostrar las tarjetas.
        */

        requestAnimationFrame(() => {

            observarTarjetasVisibles();

        });

    }


    /*========================================
          EVENTO VER MÁS / VER MENOS
    =========================================*/

    if (botonProyectos && tarjetas.length > 0) {

        botonProyectos.addEventListener("click", () => {

            const todasVisibles =
                cantidadVisible >= tarjetas.length;


            /*--------------------------------------
                     MOSTRAR MENOS
            ---------------------------------------*/

            if (todasVisibles) {

                cantidadVisible = cantidadInicial;

                actualizarTarjetas();


                const seccionProyectos =
                    document.getElementById(
                        "mis-proyectos"
                    );


                if (seccionProyectos) {

                    const posicion =
                        seccionProyectos
                            .getBoundingClientRect()
                            .top +

                        window.scrollY +

                        180;


                    window.scrollTo({

                        top:posicion,

                        behavior:"smooth"

                    });

                }

                return;

            }


            /*--------------------------------------
                       MOSTRAR MÁS
            ---------------------------------------*/

            const cantidadAnterior =
                cantidadVisible;


            cantidadVisible = Math.min(

                cantidadVisible + cantidadPorClic,

                tarjetas.length

            );


            /*
            Reiniciamos únicamente las tarjetas
            nuevas para que entren con animación.
            */

            tarjetas.forEach((tarjeta, indice) => {

                const esNueva =
                    indice >= cantidadAnterior &&
                    indice < cantidadVisible;


                if (esNueva) {

                    tarjeta.classList.remove("visible");

                }

            });


            actualizarTarjetas();

        });

    }


    /*========================================
                ESTADO INICIAL
    =========================================*/

    actualizarTarjetas();

});