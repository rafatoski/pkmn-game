document.addEventListener('DOMContentLoaded', function () {

    /* Menu responsive */
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu-items');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    /* Sonido al seleccionar Pokémon */
    const clickSound = new Audio('./assets/sounds/button-click.wav');
    const clickNext = new Audio('./assets/sounds/button-next.wav');

    /* sonido de siguiente botn */
    const botones = document.querySelectorAll('.btn-next');

    botones.forEach(btn => {
        btn.addEventListener('click', function () {
            if (btn.classList.contains('btn-next')) {
                clickNext.play();
            }
        });
        });


     /* Obtener elementos del DOM */
     const inputNombre = document.getElementById("nombreUsuario");
     const formNombre = document.getElementById("form-nombre");
     const btnNombre = document.getElementById("btn-nombre");
     const btnSeleccionar = document.getElementById("btn-seleccionar");
     const nombreJugador = document.getElementById("nombre-jugador");
     const seleccionarPkmn = document.getElementById("seleccionar-pkmn");
     const batalla = document.getElementById("batalla");
     const resultado = document.getElementById("resultado");


    let nombreJugadorGuardado = localStorage.getItem("nombreJugador") || "";
    let pokemonNombre = localStorage.getItem("nombrePokemon");


    /* Validar y habilitar botón "Vamos allá!" */
    inputNombre.addEventListener("input", function () {
        btnNombre.disabled = inputNombre.value.trim().length === 0;
    });

    /* Función común para manejar avanzar a la siguiente vista */
    function avanzarVistaNombre(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        const nombre = inputNombre.value.trim();
        localStorage.setItem("nombreJugador", nombre);
        nombreJugadorGuardado = nombre;

        document.querySelectorAll(".entrenador").forEach(span => {
            span.textContent = nombreJugadorGuardado;
        });

        console.log(nombreJugadorGuardado);
        nombreJugador.style.display = "none";
        seleccionarPkmn.style.display = "block";
    }

    /* Almacenar nombre en localStorage y avanzar a la siguiente vista */
    btnNombre.addEventListener("click", avanzarVistaNombre);

    /* Manejar el envío del formulario para permitir avanzar con "Enter" */
    formNombre.addEventListener("submit", avanzarVistaNombre);

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

    /* Definir clase Pokemon */
    class Pokemon {
        constructor(nombre, hp, movimientos) {
            this.nombre = nombre;
            this.hp = hp;
            this.movimientos = movimientos;
        }
        recibirDano(dano) {
            this.hp -= dano;
            if (this.hp < 0) this.hp = 0;
        }
    }


    const movimientos = {
        impactrueno: { nombre: 'Impactrueno', dano: 20 },
        lanzallamas: { nombre: 'Lanzallamas', dano: 20 },
        pistolaagua: { nombre: 'Pistola de agua', dano: 20 },
        latigocepa: { nombre: 'Latigo Cepa', dano: 20 },
        psiquico: { nomnre: 'Psiquico', dano: 50 },

        //agregar mas movimientos aquí
    }

    console.log('Movimientos cofigurados', movimientos);
    
    const pikachu = new Pokemon('Pikachu', 100, [movimientos.impactrueno]);
    const charmander = new Pokemon('Charmander', 100, [movimientos.lanzallamas]);
    const bulbasaur = new Pokemon('Bulbasaur', 100, [movimientos.latigocepa]);
    const squirtle = new Pokemon('Squirtle', 100, [movimientos.pistolaagua]);

    const pokemones = [pikachu, charmander, bulbasaur, squirtle];

    console.log('Pokemones creados', pokemones);


    /* Avanzar a la vista de batalla */
    btnSeleccionar.addEventListener("click", function () {
        const pokemonSeleccionado = document.querySelector(".pokemon-card.selected");

        if (pokemonSeleccionado) {
            const pokemonNombre = pokemonSeleccionado.getAttribute("data-pokemon");
            localStorage.setItem("pokemonSeleccionado", pokemonNombre);

            const nombreGuardado = localStorage.getItem("nombreJugador");
            document.getElementById("entrenador").textContent = nombreGuardado;
            document.getElementById("pokemon-seleccionado").textContent = pokemonNombre;
            document.getElementById("pokemon-seleccionado-img").src=`./assets/images/${pokemonNombre}.png`;

            // Encontrar Pokémon seleccionado por el usuario
            const pokemonUsuario = pokemones.find(p => p.nombre.toLowerCase() === pokemonNombre.toLowerCase());
            console.log('Pokemon del usuario: ', pokemonUsuario);

            // Seleccionar aleatoriamente el Pokémon del rival
            const pokemonRival = pokemones[Math.floor(Math.random() * pokemones.length)];
            console.log('Pokemon rival seleccionado: ', pokemonRival);

            // Mostrar nombre de los Pokémon involucrados en pantalla
            document.getElementById("pokemon-seleccionado").textContent = pokemonUsuario.nombre;
            document.getElementById("pokemon-rival").textContent = pokemonRival.nombre;
            document.getElementById("pokemon-rival-img").src=`./assets/images/${pokemonRival.nombre.toLowerCase()}.png`;

            seleccionarPkmn.style.display = "none";
            batalla.style.display = "block";
        }
    });
 
 
    /* Lógica adicional para el botón "Volver a jugar" si es necesario */

});
