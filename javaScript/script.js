const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Ruta para obtener la lista de los primeros 151 Pokémon
app.get('/pokemon/list', async (req, res) => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        res.json(data.results); // Enviamos solo la lista de nombres y URLs de cada Pokémon
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de Pokémon' });
    }
});

// Ruta para obtener datos de un Pokémon específico
app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            throw new Error(`Pokémon ${pokemonName} no encontrado`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
