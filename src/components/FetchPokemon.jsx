import { useEffect, useState } from "react";

export const fetchCharacter = () => {
      const [pokemon, setPokemon] = useState([]);
      const [error, setError] = useState(null);

      useEffect(() => {
        const getPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                const detailRequests = data.results.map((p) =>
                    fetch(p.url).then((res) => res.json())
                );

                const details = await Promise.all(detailRequests);
                console.log(details);
                const pokemonData = details.map((p) => ({
                    id: p.id,
                    name:p.name,
                    image:p.sprites.front_default,
                }));

                setPokemon(pokemonData);
            } catch (err) {
                setError(err);
            }
        };
        getPokemon();
    }, []);
    return {pokemon, error}
}