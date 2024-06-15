document.addEventListener('DOMContentLoaded', function() {
    /* Menu responsive */
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu-items');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    /* Sonido al seleccionar Pokémon */
    const clickSound = new Audio('/assets/sounds/button-click.wav');

    /* Obtener elementos del DOM */
    const inputNombre = document.getElementById("nombreUsuario");
    const btnNombre = document.getElementById("btn-nombre");
    const btnSeleccionar = document.getElementById("btn-seleccionar");
    const btnResultado = document.getElementById("pkmn-seleccionado");
    const nombreJugador = document.getElementById("nombre-jugador");
    const seleccionarPkmn = document.getElementById("seleccionar-pkmn");
    const resultado = document.getElementById("resultado");
    const entrenadorSpan = document.getElementById("entrenador");

    let nombreJugadorGuardado = localStorage.getItem("nombreJugador") || "";

    /* Validar y habilitar botón "Vamos allá!" */
    inputNombre.addEventListener("input", function() {
        btnNombre.disabled = inputNombre.value.trim().length === 3;
    });

    /* Almacenar nombre en localStorage y avanzar a la siguiente vista */
    btnNombre.addEventListener("click", function() {
        const nombre = inputNombre.value.trim();
        localStorage.setItem("nombreJugador", nombre);
        nombreJugadorGuardado = nombre;

        document.querySelectorAll(".entrenador").forEach(span => {
            span.textContent = nombreJugadorGuardado;
        });

        console.log(nombreJugadorGuardado);
        nombreJugador.style.display = "none";
        seleccionarPkmn.style.display = "block";
    });

    /* Seleccionar Pokémon */
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
        card.addEventListener('click', () => {
            pokemonCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            clickSound.play();

            // Habilitar botón "Empezar" al seleccionar un Pokémon
            btnSeleccionar.disabled = false;
        });
    });

    /* Avanzar a la vista de resultado */
    btnSeleccionar.addEventListener("click", function() {
        const pokemonSeleccionado = document.querySelector(".pokemon-card.selected");

        if (pokemonSeleccionado) {
            const pokemon = pokemonSeleccionado.getAttribute("data-pokemon");
            localStorage.setItem("pokemonSeleccionado", pokemon);

            const nombreGuardado = localStorage.getItem("nombreJugador");
            document.getElementById("entrenador").textContent = nombreGuardado;
            document.getElementById("pokemon-seleccionado").textContent = pokemon;

            seleccionarPkmn.style.display = "none";
            resultado.style.display = "block";
        }
    });

    /* Lógica adicional para el botón "Volver a jugar" si es necesario */

});
