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
        ataquerapido: { nombre: 'Ataque Rápido', dano: 15 },
        golpecuerpo: { nombre: 'Golpe cuerpo', dano: 15 },
        aranazo: { nombre: 'Arañazo', dano: 15 },
        psiquico: { nombre: 'Psiquico', dano: 50 },
        // agregar mas movimientos aquí
    }

    console.log('Movimientos configurados', movimientos);

    const pikachu = new Pokemon('Pikachu', 100, [movimientos.impactrueno, movimientos.aranazo]);
    const charmander = new Pokemon('Charmander', 100, [movimientos.lanzallamas, movimientos.golpecuerpo]);
    const bulbasaur = new Pokemon('Bulbasaur', 100, [movimientos.latigocepa, movimientos.ataquerapido]);
    const squirtle = new Pokemon('Squirtle', 100, [movimientos.pistolaagua, movimientos.aranazo]);

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
    const ataqueB = document.getElementById('ataqueB');

    // Variables para almacenar el nombre del usuario y el Pokémon seleccionado
    let nombreUsuario = '';
    let pokemonSeleccionado = '';
    let usuario; // Variable para el Pokémon del usuario
    let rival; // Variable para el Pokémon del rival

    // Evento para avanzar desde la pantalla de onboarding
    btnAvanzar.addEventListener('click', () => {
        onboarding.style.display = 'none';
        seleccionarPkmn.style.display = 'block';
    });

    // Evento para seleccionar un Pokémon
    pokemonCards.forEach(card => {
        card.addEventListener('click', () => {
            pokemonSeleccionado = card.getAttribute('data-pokemon');
            clickSound.play();

            // Remover la selección previa
            pokemonCards.forEach(c => c.classList.remove('selected'));

            // Añadir la clase 'selected' al Pokémon seleccionado
            card.classList.add('selected');

            // Habilitar el botón de seleccionar
            btnSeleccionar.disabled = false;
            // Mostrar el Pokémon seleccionado
            mostrarPokemonSeleccionado(pokemonSeleccionado);
        });
    });

    function mostrarPokemonSeleccionado(pokemonNombre) {
        // Obtener el Pokémon seleccionado
        const pokemonSeleccionado = pokemones.find(pokemon => pokemon.nombre === pokemonNombre);
        // Verificar si se encontró el Pokémon
        if (!pokemonSeleccionado) {
            console.error(`No se encontró el Pokémon con nombre: ${pokemonNombre}`);
            return; // Salir de la función si no se encuentra el Pokémon
        }

        // Obtener los movimientos del Pokémon
        const movimiento1 = pokemonSeleccionado.movimientos[0];
        const movimiento2 = pokemonSeleccionado.movimientos[1];

        // Asignar el nombre del movimiento a los botones
        ataqueA.textContent = movimiento1.nombre;
        ataqueB.textContent = movimiento2.nombre;
    }

    // función para seleccionar un rival al azar 
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

            // Seleccionar Pokémon rival al azar
            rival = seleccionarPkmnRival();
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

    // Vida inicial de los jugadores
    let vidaUsuario = 100;
    let vidaRival = 100;

    // Mostrar la vida en la interfaz
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

        if (vida <= 20) {
            hpBar.style.backgroundColor = 'red';
        } else {
            hpBar.style.backgroundColor = 'green';
        }
    }

    // Evento para guardar el nombre del usuario y el Pokémon seleccionado
    btnSeleccionar.addEventListener('click', (e) => {
        e.preventDefault();
        nombreUsuario = nombreUsuarioInput.value.trim();

        if (nombreUsuario && pokemonSeleccionado) {
            // Obtener el Pokémon seleccionado por el usuario desde la lista de Pokémon
            usuario = pokemones.find(pokemon => pokemon.nombre === pokemonSeleccionado);

            // Pokémon rival al azar
            rival = seleccionarPkmnRival();
            const pokemonRival = rival.nombre;

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

            startBattle();
        }
    });

    // Función de ataque y batalla
    function startBattle() {
        ataqueA.addEventListener('click', () => {
            attack(0);
        });
        ataqueB.addEventListener('click', () => {
            attack(1);
        });
    }

    // Función para realizar un ataque
    function attack(attackIndex) {
        // Obtener el ataque seleccionado del Pokémon del usuario
        const userAttack = usuario.movimientos[attackIndex];

        // Reducir la HP del oponente basado en el daño del ataque
        rival.recibirDano(userAttack.dano);

        // Mostrar el mensaje del ataque en el registro de batalla
        logBattle(`Tu ${usuario.nombre} uso ${userAttack.nombre}, ¡Causo ${userAttack.dano} de daño!`);

        // Actualizar los elementos de visualización de HP
        actualizarBarraVida(rival.hp, hpBarRival);
        vidaPkmnRival.textContent = rival.hp;

        // Verificar si el oponente ha sido derrotado
        if (rival.hp <= 0) {
            endBattle('win');
            return;
        }

        // Ataque aleatorio del oponente
        const randomAttack = rival.movimientos[Math.floor(Math.random() * rival.movimientos.length)];
        usuario.recibirDano(randomAttack.dano);

        // Mostrar el mensaje del ataque del oponente en el registro de batalla
        logBattle(`${rival.nombre} rival uso ${randomAttack.nombre}. ¡Causo ${randomAttack.dano} de daño!`);

        // Actualizar los elementos de visualización de HP
        actualizarBarraVida(usuario.hp, hpBarUsuario);
        vidaPkmnUsuario.textContent = usuario.hp;

        // Verificar si el Pokémon del usuario ha sido derrotado
        if (usuario.hp <= 0) {
            endBattle('lose');
        }
    }

    // Función que muestra ataque
    function logBattle(message) {
        // Obtener el div del mensaje
        const logEntry = document.createElement('p');
        const battleLog = document.getElementById('battle-log');
        
        let index = 0;

        function typeCharacter() {
            if (index < message.length){
                logEntry.textContent += message[index];
                index++;
                // Imprimir
                battleLog.appendChild(logEntry);
                setTimeout(typeCharacter, 20) //velocidad de escritura
            }else {
                // Scroll
                battleLog.scrollTop = battleLog.scrollHeight;
            }
        }

        setTimeout(typeCharacter , 700);        
    }

    // Función para terminar la batalla
    function endBattle(result) {
        if (result === 'win') {
            logBattle('¡Has ganado la batalla!');
        } else {
            logBattle('Has perdido la batalla...');
        }
    }

    // Evento del botón de reset
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
