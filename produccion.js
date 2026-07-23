const imagenes = document.querySelectorAll(".item-galeria img");

const lightbox = document.getElementById("lightbox");

const imagen = document.getElementById("imagen-lightbox");

const cerrar = document.querySelector(".cerrar-lightbox");

imagenes.forEach((foto)=>{

    foto.addEventListener("click",()=>{

        imagen.src=foto.src;

        lightbox.classList.add("activo");

    });

});

cerrar.addEventListener("click",()=>{

    lightbox.classList.remove("activo");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("activo");

    }

});

const botones = document.querySelectorAll(".filtro");

const tarjetas = document.querySelectorAll(".item-galeria");

botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        botones.forEach(b=>b.classList.remove("activo"));

        boton.classList.add("activo");

        const categoria = boton.dataset.filter;

        tarjetas.forEach((tarjeta)=>{

            if(categoria==="todos"){

                tarjeta.style.display="block";

            }

            else if(tarjeta.dataset.category===categoria){

                tarjeta.style.display="block";

            }

            else{

                tarjeta.style.display="none";

            }

        });

    });

});

// ==========================
// FLECHAS LIGHTBOX
// ==========================

const btnIzquierda = document.querySelector(".izquierda");
const btnDerecha = document.querySelector(".derecha");

let indiceActual = 0;

// Guardar qué imagen abrió el lightbox
imagenes.forEach((foto, index) => {

    foto.addEventListener("click", () => {

        indiceActual = index;

    });

});

// Flecha derecha
btnDerecha.addEventListener("click", (e) => {

    e.stopPropagation();

    indiceActual++;

    if (indiceActual >= imagenes.length) {

        indiceActual = 0;

    }

    imagen.src = imagenes[indiceActual].src;

});

// Flecha izquierda
btnIzquierda.addEventListener("click", (e) => {

    e.stopPropagation();

    indiceActual--;

    if (indiceActual < 0) {

        indiceActual = imagenes.length - 1;

    }

    imagen.src = imagenes[indiceActual].src;

});

// Flechas del teclado
document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("activo")) return;

    if (e.key === "ArrowRight") {

        btnDerecha.click();

    }

    if (e.key === "ArrowLeft") {

        btnIzquierda.click();

    }

});

//=========================
// CONTADORES ANIMADOS
//=========================

const contadores = document.querySelectorAll(".contador");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const contador = entry.target;

            const objetivo = +contador.dataset.target;

            let numero = 0;

            const velocidad = objetivo / 60;

            const actualizar = ()=>{

                numero += velocidad;

                if(numero < objetivo){

                    contador.textContent = Math.ceil(numero);

                    requestAnimationFrame(actualizar);

                }else{

                    contador.textContent = objetivo;

                }

            }

            actualizar();

            observer.unobserve(contador);

        }

    });

});

contadores.forEach(contador=>{

    observer.observe(contador);

});

//=========================
// ANIMACIONES AL SCROLL
//=========================

const elementos = document.querySelectorAll(".animar");

const animacionScroll = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:0.15
});

elementos.forEach((elemento)=>{

    animacionScroll.observe(elemento);

});

// ==========================================
// FUNCIÓN PARA MOSTRAR "VER MÁS / VER MENOS"
// ==========================================
function configurarVerMasMenos(selectorItems, selectorBoton, cantidadInicial, textoMas = "Ver más", textoMenos = "Ver menos") {
    const items = document.querySelectorAll(selectorItems);
    const boton = document.getElementById(selectorBoton);
    
    if (!items.length || !boton) return;

    let itemsMostrados = cantidadInicial;

    function actualizarVisibilidad() {
        items.forEach((item, indice) => {
            if (indice < itemsMostrados) {
                item.style.setProperty('display', 'block', 'important');
            } else {
                item.style.setProperty('display', 'none', 'important');
            }
        });

        // CONTROL DEL TEXTO DEL BOTÓN
        if (itemsMostrados >= items.length) {
            boton.textContent = textoMenos;
        } else {
            boton.textContent = textoMas;
        }
    }

    // Inicializamos el estado
    actualizarVisibilidad();

    // Evento al dar clic
    boton.addEventListener('click', () => {
        if (itemsMostrados >= items.length) {
            // Si ya se ven todos, el botón "Ver menos" reinicia al número original
            itemsMostrados = cantidadInicial;
            // Scroll suave hacia arriba de la sección para no perder al usuario
            boton.closest('section').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Si faltan por ver, el botón "Ver más" suma otros elementos
            itemsMostrados += cantidadInicial;
        }
        actualizarVisibilidad();
    });
}

// ACTIVAR EL COMPORTAMIENTO (Fotos inician en 6, Videos en 3)
configurarVerMasMenos('.item-galeria', 'ver-mas-fotos', 6, 'Ver más fotos', 'Ver menos fotos');
configurarVerMasMenos('.video-item', 'ver-mas-videos', 3, 'Ver más videos', 'Ver menos videos');