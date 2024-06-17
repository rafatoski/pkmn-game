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
 
    // Seleccionar elementos del DOM
    const onboarding = document.getElementById('onboarding');
    const seleccionarPkmn = document.getElementById('seleccionar-pkmn');
    const btnAvanzar = document.getElementById('btn-avanzar');
    const btnSeleccionar = document.getElementById('btn-seleccionar');
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    const batalla = document.getElementById('batalla');
    const entrenadorSpan = document.getElementById('entrenador');
    const pokemonSeleccionadoSpan = document.getElementById('pokemon-seleccionado');
    const pokemonSeleccionadoImg = document.getElementById('pokemon-seleccionado-img');
    const pokemonRivalSpan = document.getElementById('pokemon-rival');
    const pokemonRivalImg = document.getElementById('pokemon-rival-img');
    const ataqueA = document.getElementById('ataqueA');

    // Variables para almacenar el nombre del usuario y el Pokémon seleccionado
    let nombreUsuario = '';
    let pokemonSeleccionado = '';

    // Evento para avanzar desde la pantalla de onboarding
    btnAvanzar.addEventListener('click', () => {
        onboarding.style.display = 'none';
        seleccionarPkmn.style.display = 'block';
    });

    // Evento para seleccionar un Pokémon
    pokemonCards.forEach(card => {
        card.addEventListener('click', () => {
            pokemonSeleccionado = card.getAttribute('data-pokemon');
            
            // Remover la selección previa
            pokemonCards.forEach(c => c.classList.remove('selected'));
            
            // Añadir la clase 'selected' al Pokémon seleccionado
            card.classList.add('selected');
            
            // Habilitar el botón de seleccionar
            btnSeleccionar.disabled = false;
        });
    });

    // funcion para seleccionar un rival al azar 
    function seleccionarPkmnRival() {
        const randomIndex = Math.floor(Math.random() * pokemones.length);
        return pokemones[randomIndex];
    }
    // Cargar el nombre del usuario y el Pokémon seleccionado desde el localStorage (si existen)
    window.addEventListener('load', () => {
        const savedNombreUsuario = localStorage.getItem('nombreUsuario');
        const savedPokemonSeleccionado = localStorage.getItem('pokemonSeleccionado');

        if (savedNombreUsuario && savedPokemonSeleccionado) {
            nombreUsuario = savedNombreUsuario;
            pokemonSeleccionado = savedPokemonSeleccionado;

            // Selecciona Pokémon rival al azar
            const rival = seleccionarPkmnRival();
            const pokemonRival = rival.nombre;

            // Mostrar la pantalla de batalla
            onboarding.style.display = 'none';
            seleccionarPkmn.style.display = 'none';
            batalla.style.display = 'block';

            // Mostrar el nombre del usuario y el Pokémon seleccionado en la pantalla de batalla
            entrenadorSpan.textContent = nombreUsuario;
            pokemonSeleccionadoSpan.textContent = pokemonSeleccionado;
            pokemonSeleccionadoImg.src = `./assets/images/${pokemonSeleccionado}.png`;
            // Mostrar el Pokémon rival
            pokemonRivalSpan.textContent = pokemonRival;
            pokemonRivalImg.src = `./assets/images/${pokemonRival.toLowerCase()}.png`;
        }
    });


    // vida inicial de los jugadores
    let vidaUsuario = 80;
    let vidaRival = 75;

    //mostrar la vida en la interfaz
    const vidaPkmnUsuario = document.querySelector('.vida-pkmn-user');
    const vidaPkmnRival = document.querySelector('.vida-pkmn-rival');
    const hpBarUsuario = document.querySelector('.hp-bar-usuario');
    const hpBarRival = document.querySelector('.hp-bar-rival');

    vidaPkmnUsuario.textContent = vidaUsuario;
    vidaPkmnRival.textContent = vidaRival;

    actualizarBarraVida(vidaUsuario, hpBarUsuario);
    actualizarBarraVida(vidaRival, hpBarRival);

    // Función para actualizar la barra de vida
    function actualizarBarraVida(vida, hpBar) {
        const porcentajeVida = (vida / 100) * 100;
        hpBar.style.width = porcentajeVida + '%';

        if (vida <= 20){
            hpBar.style.backgroundColor = 'red';
        }else {
            hpBar.style.backgroundColor = 'green';
        }
    }
    // batalla
    let turnoUsuario = true; //controlar el turno
    let numeroBatallas = 0; //contador de numero d ebatallas
    let usuario; //pokemon seleccionado por el usuario
    let rival; //pokemon seleccionado aleatorio para el rival

    //funcion para simular el ataque del pokmon 
    function atacarPokemon(atacante, defensor, movimiento) {
        const dano = movimiento.dano;

        defensor.recibirDano(dano);
        actualizarBarraVida(defensor.hp, atacante === usuario ? hpBarUsuario : hpBarRival);
        mostrarMovimiento(atacante.nombre, movimiento.nombre, dano);
    }
    // Función para mostrar un movimiento en la consola (para propósitos de prueba)
    function mostrarMovimiento(nombrePokemon, nombreMovimiento, dano) {
        console.log(`${nombrePokemon} usó ${nombreMovimiento} y causó ${dano} puntos de daño.`);
    }

    // Función para verificar el fin de la batalla
    function verificarFinBatalla() {
        if (vidaUsuario <= 0 || vidaRival <= 0) {
            numeroBatallas++;
            if (vidaUsuario <= 0) {
                alert('¡Pailas, Game Over!');
            } else {
                // Cargar un nuevo rival o reiniciar la batalla según tus necesidades
                alert('¡Batalla finalizada!');
            }
        }
    }

    // Función para mostrar los movimientos del Pokémon seleccionado por el usuario
    function mostrarMovimientos() {
        const movimientosPokemon = usuario.movimientos;

        // Actualizar nombre del ataque en el botón (asumiendo un único botón de ataque en este ejemplo)
        ataqueA.textContent = movimientosPokemon[0].nombre;

        // Agregar evento de ataque en el botón
        ataqueA.addEventListener('click', () => {
            if (turnoUsuario) {
                atacarPokemon(usuario, rival, movimientosPokemon[0]);
                turnoUsuario = false; // Cambio al turno del rival después del ataque del usuario
                cicloDeTurnos(); // Llamar a cicloDeTurnos para continuar con el siguiente turno
            }
        });
    }

    
    function cicloDeTurnos() {
        if (turnoUsuario) {
            // Mostrar movimientos del usuario
            mostrarMovimientos(usuario);
        } else {
            // Turno del rival
            turnoRival();
        }
    }
    
    function turnoRival() {
        const movimientosRival = rival.movimientos;
        const movimientoAleatorio = movimientosRival[Math.floor(Math.random() * movimientosRival.length)];
    
        // Simular el ataque del rival
        atacarPokemon(rival, usuario, movimientoAleatorio);
    
        // Verificar fin de la batalla después del ataque del rival
        verificarFinBatalla();
    
        // Cambiar al turno del usuario
        turnoUsuario = true;
    
        // Iniciar el ciclo de turnos nuevamente (mostrar movimientos del usuario)
        cicloDeTurnos();
    }    
      
    // Evento para guardar el nombre del usuario y el Pokémon seleccionado
    btnSeleccionar.addEventListener('click', (e) => {
        e.preventDefault();
        nombreUsuario = nombreUsuarioInput.value.trim();

        if (nombreUsuario && pokemonSeleccionado) {
            
            // Obtener el Pokémon seleccionado por el usuario desde la lista de Pokémon
            usuario = pokemones.find(pokemon => pokemon.nombre === pokemonSeleccionado);
            
            //pokmn rival al azar
            rival = seleccionarPkmnRival();
            pokemonRival = rival.nombre;
            
            // Guardar el nombre del usuario y el Pokémon seleccionado
            localStorage.setItem('nombreUsuario', nombreUsuario);
            localStorage.setItem('pokemonSeleccionado', pokemonSeleccionado);
            
            // Mostrar la pantalla de batalla
            seleccionarPkmn.style.display = 'none';
            batalla.style.display = 'block';

            // Mostrar el nombre del usuario y el Pokémon seleccionado en la pantalla de batalla
            entrenadorSpan.textContent = nombreUsuario;
            pokemonSeleccionadoSpan.textContent = pokemonSeleccionado;
            pokemonSeleccionadoImg.src = `./assets/images/${pokemonSeleccionado}.png`;

            // Mostrar el Pokémon rival
            pokemonRivalSpan.textContent = pokemonRival;
            pokemonRivalImg.src = `./assets/images/${pokemonRival.toLowerCase()}.png`;
        }

        cicloDeTurnos();
    });
    //evento del boton de reset


    const btnLimpiarLocalStorage = document.getElementById('btn-limpiar-localStorage');
    btnLimpiarLocalStorage.addEventListener('click', () => {
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('pokemonSeleccionado');
        console.log('LocalStorage limpiado.');

        onboarding.style.display = 'block';
        seleccionarPkmn.style.display = 'none';
        batalla.style.display = 'none';
    });

});
