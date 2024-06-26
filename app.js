document.addEventListener('DOMContentLoaded', function () {

    /* Menu responsive */
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu-items');

    if (menuBtn && menu) {
            menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }


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
        impactrueno: { nombre: 'Impactrueno', dano: 50 },
        lanzallamas: { nombre: 'Lanzallamas', dano: 50 },
        pistolaagua: { nombre: 'Pistola de agua', dano: 50 },
        latigocepa: { nombre: 'Latigo Cepa', dano: 50 },
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
    const mew = new Pokemon ('Mew' , 100, [movimientos.psiquico, movimientos.ataquerapido]);

    const pokemones = [pikachu, charmander, bulbasaur, squirtle , mew];

    console.log('Pokemones creados', pokemones);

    // Seleccionar elementos del DOM
    const onboarding = document.getElementById('onboarding');
    const seleccionarPkmn = document.getElementById('seleccionar-pkmn');
    const btnAvanzar = document.getElementById('btn-avanzar');
    const btnSeleccionar = document.getElementById('btn-seleccionar');
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    const batalla = document.getElementById('batalla');
    const resultado = document.getElementById('resultado');
    const entrenadorSpan = document.getElementById('entrenador');
    const pokemonSeleccionadoSpan = document.getElementById('pokemon-seleccionado');
    const pokemonSeleccionadoImg = document.getElementById('pokemon-seleccionado-img');
    const pokemonRivalSpan = document.getElementById('pokemon-rival');
    const pokemonRivalImg = document.getElementById('pokemon-rival-img');
    const ataqueA = document.getElementById('ataqueA');
    const ataqueB = document.getElementById('ataqueB');
    const battleCountDisplay = document.getElementById('battle-count');
    const recordDisplay = document.getElementById('record');

    // Variables para almacenar el nombre del usuario y el Pokémon seleccionado
    let nombreUsuario = '';
    let pokemonSeleccionado = '';
    let usuario; // Variable para el Pokémon del usuario
    let rival; // Variable para el Pokémon del rival
    let numeroDeVictorias = 0;// conteo de victorias
    let recordDeBatallas = localStorage.getItem('recordDeBatallas') || 0;


    // Evento para avanzar desde la pantalla de onboarding
    if(btnAvanzar){
        btnAvanzar.addEventListener('click', () => {
            onboarding.style.display = 'none';
            seleccionarPkmn.style.display = 'block';
        });
    }

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

    actualizarBarraVida(vidaUsuario, hpBarUsuario , vidaPkmnUsuario);
    actualizarBarraVida(vidaRival, hpBarRival , vidaPkmnRival);

    // Función para actualizar la barra de vida
    function actualizarBarraVida(vida, hpBar , vidaSpan) {
        const porcentajeVida = (vida/100) * 100;
        hpBar.style.width = porcentajeVida + '%';

        if (vida <= 20) {
            hpBar.style.backgroundColor = 'red';
        } else {
            hpBar.style.backgroundColor = 'green';
        }
        
        vidaSpan.textContent = vida;
    }

    // Evento para guardar el nombre del usuario y el Pokémon seleccionado
    if(btnSeleccionar) {
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
                pokemonSeleccionadoImg.src = `./assets/images/${pokemonSeleccionado.toLowerCase()}.png`;
    
                // Mostrar el Pokémon rival
                pokemonRivalSpan.textContent = pokemonRival;
                pokemonRivalImg.src = `./assets/images/${pokemonRival.toLowerCase()}.png`;
    
                startBattle();
            }
        });
    }

    // Función de ataque y batalla
    function startBattle() {
        ataqueA.addEventListener('click', () => {
            attack(0);
        });
        ataqueB.addEventListener('click', () => {
            attack(1);
        });
    }

    // Función que muestra ataque con múltiples mensajes y retraso
function logBattle(messages, delays = [], callback) {
    const battleLog = document.getElementById('battle-log');
    battleLog.style.display = 'block';
    // Asegurarse de que `messages` sea siempre un array
    if (!Array.isArray(messages)) {
        messages = [messages];
    }

    let currentMessageIndex = 0;

    function displayNextMessage() {
        if (currentMessageIndex < messages.length) {
            const logEntry = document.createElement('p');
            battleLog.appendChild(logEntry);

            let index = 0;
            const message = messages[currentMessageIndex];

            function typeCharacter() {
                if (index < message.length) {
                    logEntry.textContent += message[index];
                    index++;
                    setTimeout(typeCharacter, 50); // Ajusta este valor para la velocidad de escritura
                } else {                    
                    battleLog.scrollTop = battleLog.scrollHeight; // Scroll al final después de escribir
                    currentMessageIndex++;
                    if (currentMessageIndex < messages.length) {
                        const delay = delays[currentMessageIndex] || 1000; // Usar 1000 ms por defecto si no se proporciona un delay
                        setTimeout(displayNextMessage, delay);
                    } else if (callback) {
                        battleLog.style.display = 'none';
                        callback(); // Llamar al callback una vez se han mostrado todos los mensajes
                    }
                }
            }

            typeCharacter();
        }
    }

    displayNextMessage();
}

// Ejemplo de uso en la función de ataque
function attack(attackIndex) {
    // Obtener el ataque seleccionado del Pokémon del usuario
    const userAttack = usuario.movimientos[attackIndex];

    // Reducir HP del rival basado en el daño del ataque
    rival.recibirDano(userAttack.dano);
    pokemonSeleccionadoImg.classList.add('atacando-derecha');
    // Remover la clase de animación después de la animación
    setTimeout(() => {
        pokemonSeleccionadoImg.classList.remove('atacando-derecha');
    }, 300); // Ajusta el tiempo según la duración de la animación

    // Mostrar el mensaje del ataque en el registro de batalla
    logBattle(
        [`Tu ${usuario.nombre} usó ${userAttack.nombre}`, `¡Causó ${userAttack.dano} de daño!`],
        [500, 500], // Retrasos en milisegundos entre los mensajes
        () => {
            // Añadir animación recibir daño y quitar despues de tiempo
            pokemonRivalImg.classList.add('recibiendo-dano');
            setTimeout(() => {
                pokemonRivalImg.classList.remove('recibiendo-dano');
            }, 500); //tiempo duración de la animación

            // Actualizar los elementos de visualización de HP del rival
            actualizarBarraVida(rival.hp, hpBarRival, vidaPkmnRival);

            // Verificar si el rival ha sido derrotado
            if (rival.hp <= 0) {
                endBattle('win');
                rival.hp = 100;
                return;
            }

            // Esperar antes de que el rival ataque
            setTimeout(() => {
                // Ataque aleatorio del rival
                const randomAttack = rival.movimientos[Math.floor(Math.random() * rival.movimientos.length)];
                usuario.recibirDano(randomAttack.dano);
                if(usuario.hp < 0) usuario.hp = 0;
                // animación de ataque al Pokémon rival
                pokemonRivalImg.classList.add('atacando-izquierda'); 
                setTimeout(() => {
                    pokemonRivalImg.classList.remove('atacando-izquierda');
                }, 300); // tiempo duración de la animación


                // Mostrar el mensaje del ataque del rival en el registro de batalla
                logBattle(
                    [`El ${rival.nombre} rival usó ${randomAttack.nombre}`, `¡Causó ${randomAttack.dano} de daño!`],
                    [500, 500], // Retrasos en milisegundos entre los mensajes
                    () => {
                        // animación de recibir daño 
                        pokemonSeleccionadoImg.classList.add('recibiendo-dano');
                        setTimeout(() => {
                            pokemonSeleccionadoImg.classList.remove('recibiendo-dano');
                        }, 500); // tiempo duración de la animación

                        // Actualizar los elementos de visualización de HP
                        actualizarBarraVida(usuario.hp, hpBarUsuario, vidaPkmnUsuario);
                        // Verificar si el Pokémon del usuario ha sido derrotado
                        if (usuario.hp <= 0) {
                            endBattle('lose');
                        }
                    }
                );
            }, 1000); // Espera 1 segundo antes de que el rival ataque
        }
    );
}


    // Función para terminar la batalla
    function endBattle(result) {
        if (result === 'win') {
            numeroDeVictorias++;
            pokemonRival = seleccionarPkmnRivalAleatorio();
            battleCountDisplay.textContent =` ${numeroDeVictorias}`;
            logBattle(["El rival murio, ¡Has ganado la batalla !"] ,[3000], ()=> {
                iniciarNuevaBatalla();//reinicia la battle
            });
        } else {
            logBattle(["Tu Pokemon ha muerto, has perdido la batalla..."] , [1000], ()=> {
                actualizarRecordDeBatallas();                
                console.log('Fin del juego. ');
                Resultado();
            });
        }
    }

    function Resultado() {
        batalla.style.display = "none";
        resultado.style.display = "block";

        document.querySelector(".puntos").textContent = `${numeroDeVictorias}`;
    }

    function seleccionarPkmnRivalAleatorio() {
        const rivalesDisponibles = [
            { nombre: "charmander", hp: 100 },
            { nombre: "squirtle", hp: 100 },
            { nombre: "bulbasaur", hp: 100 },
            { nombre: "pikachu", hp: 100 }
        ];
    
        // Seleccionar Mew cada 4 victorias
        if ((numeroDeVictorias + 1) % 4 === 0) {
            return { nombre: 'Mew', hp: 100 };
        }
    
        // Seleccionar un rival al azar
        const indiceAleatorio = Math.floor(Math.random() * rivalesDisponibles.length);
        return rivalesDisponibles[indiceAleatorio];
    }


    // Función para iniciar nueva batalla despúes de ganar la primera
    function iniciarNuevaBatalla() {
        // Lógica para seleccionar al rival al azar
        pokemonRival = seleccionarPkmnRivalAleatorio();
        rival = new Pokemon(pokemonRival.nombre, pokemonRival.hp, movimientos[pokemonRival.nombre.toLowerCase()]);
    
        // Reiniciar HP de los Pokémon
        usuario.hp = 100;
        rival.hp = 100;
    
        actualizarBarraVida(usuario.hp, hpBarUsuario, vidaPkmnUsuario);
        actualizarBarraVida(rival.hp, hpBarRival, vidaPkmnRival);
    
        console.log('Empezó una nueva batalla');
    }

    function actualizarRecordDeBatallas() {
        if (numeroDeVictorias > recordDeBatallas) {
            recordDeBatallas = numeroDeVictorias;

            localStorage.setItem('recordDeBatallas' , recordDeBatallas);            
            recordDisplay.textContent = `${recordDeBatallas}`;
        }
    }

    function reiniciarJuego() {
        localStorage.removeItem('usuario');
        localStorage.removeItem('pokemonSeleccionado');
        numeroDeVictorias = 0;
        battleCountDisplay.textContent = `${numeroDeVictorias}`;
        window.location.reload();
    }


    // ************************** 
    // ****************************** Evento del botón de reset
    const btnLimpiarLocalStorage = document.querySelector('.btn-limpiar-localStorage');
    btnLimpiarLocalStorage.addEventListener('click', () => {
        reiniciarJuego();
        onboarding.style.display = 'block';
        seleccionarPkmn.style.display = 'none';
        batalla.style.display = 'none';
    }); 
});

