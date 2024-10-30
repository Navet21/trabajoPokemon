async function obtenerListaPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        // Obtener los detalles necesarios de cada Pokémon
            const detallesPokemon = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const detalles = await res.json();
                    
                    // Extraer solo el nombre, tipos e imagen
                    return {
                        name: detalles.name,
                        types: detalles.types.map(t => t.type.name), // Obtiene los tipos
                        image: detalles.sprites.front_default          // Obtiene la imagen frontal
                    };
                })
        );

        return detallesPokemon;
    } catch (error) {
        console.error(`Error al obtener los detalles de los Pokémon: ${error.message}`);
    }
}

obtenerListaPokemon().then(pokemones => {
    if (pokemones) {
        pokemones.forEach(pokemon => {
            console.log(`Nombre: ${pokemon.name}`);
            console.log(`Tipos: ${pokemon.types.join(', ')}`);
            console.log(`Imagen: ${pokemon.image}`);
        });
    }
});

async function mostrarPokemon() {
    const pokemonList = await obtenerListaPokemon(); // Asegúrate de que devuelve { name, types, image } para cada Pokémon
    const listElement = document.getElementById('pokemon-list');
    
    if (pokemonList) {
        pokemonList.forEach((pokemon, index) => {
            // Crear la tarjeta de Pokémon
            const card = document.createElement('div');
            card.classList.add('max-w-xs', 'bg-white', 'shadow-md', 'rounded-lg', 'p-5', 'm-2', 'text-center');

            // Imagen del Pokémon
            const imagenPokemon = document.createElement('img');
            imagenPokemon.src = pokemon.image;
            imagenPokemon.alt = pokemon.name;
            imagenPokemon.classList.add('mx-auto', 'h-24', 'w-24');

            // Nombre del Pokémon
            const nombrePokemon = document.createElement('h3');
            nombrePokemon.textContent = `#${index + 1} - ${pokemon.name.toUpperCase()}`;
            nombrePokemon.classList.add('text-xl', 'font-semibold', 'mt-4');
            // nombrePokemon.addEventListener()

            // Tipos del Pokémon
            const tiposContainer = document.createElement('div');
            tiposContainer.classList.add('flex', 'justify-center', 'mt-2', 'space-x-2');
            
            pokemon.types.forEach(type => {
                const tipo = document.createElement('span');
                tipo.textContent = type.toUpperCase();
                tipo.classList.add('px-2', 'py-1', 'rounded-full', 'text-white');
                
                // Añade un color de fondo según el tipo
                switch (type) {
                    case 'fire':
                        tipo.style.backgroundColor = '#F08030'; // Rojo anaranjado
                        break;
                    case 'water':
                        tipo.style.backgroundColor = '#6890F0'; // Azul
                        break;
                    case 'grass':
                        tipo.style.backgroundColor = '#78C850'; // Verde
                        break;
                    case 'poison':
                        tipo.style.backgroundColor = '#A040A0'; // Morado
                        break;
                    case 'bug':
                        tipo.style.backgroundColor = '#A8B820'; // Amarillo
                        break;
                    case 'flying':
                        tipo.style.backgroundColor = '#A890F0'; // Gris
                        break;
                    case 'normal':
                        tipo.style.backgroundColor = '#A8A878'; // Grisáceo marrón
                        break;
                    case 'electric':
                        tipo.style.backgroundColor = '#F8D030'; // Amarillo anaranjado
                        break;
                    case 'ground':
                        tipo.style.backgroundColor = '#E0C068'; // Marrón amarillento
                        break;
                    case 'fighting':
                        tipo.style.backgroundColor = '#C03028'; // Rojo
                        break;
                    case 'psychic':
                        tipo.style.backgroundColor = '#F85888'; // Rosa
                        break;
                    case 'steel':
                        tipo.style.backgroundColor = '#B8B8D0'; // Plateado
                        break;
                    case 'ghost':
                        tipo.style.backgroundColor = '#705898'; // Morado fuerte
                        break;
                    case 'ice':
                        tipo.style.backgroundColor = '#98D8D8'; // Azul cian
                        break;
                    case 'rock':
                        tipo.style.backgroundColor = '#B8A038'; // Amarillo verdoso
                        break;
                    case 'dragon':
                        tipo.style.background = 'linear-gradient(to bottom, #7038F8 50%, #F08030 50%)'; // Azul y rojo mitad y mitad
                        break;
                    default:
                        tipo.style.backgroundColor = '#68A090'; // Gris verdoso para tipos desconocidos
                }

                tiposContainer.appendChild(tipo);
            });

            // Añadir elementos a la tarjeta
            card.appendChild(imagenPokemon);
            card.appendChild(nombrePokemon);
            card.appendChild(tiposContainer);

            // Añadir la tarjeta al contenedor principal
            listElement.appendChild(card);
        });
    }
}


mostrarPokemon();