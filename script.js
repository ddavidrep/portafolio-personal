const btnProyectos = document.getElementById('btn-proyectos');
const btnSobreMi = document.getElementById('btn-sobremi');

const secProyectos = document.getElementById('sec-proyectos');
const secSobremi = document.getElementById('sec-sobremi')

btnProyectos.addEventListener('click', () => {
    btnProyectos.classList.add('active');
    btnSobreMi.classList.remove('active');

    secProyectos.classList.remove('defecto-oculto');
    secSobremi.classList.add('defecto-oculto');
});

btnSobreMi.addEventListener('click', () => {
    btnSobreMi.classList.add('active');
    btnProyectos.classList.remove('active');
    secSobremi.classList.remove('defecto-oculto');
    secProyectos.classList.add('defecto-oculto');

});