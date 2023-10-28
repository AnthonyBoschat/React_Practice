import React, { useState } from "react"

function GeneratePokemon(){
    const [pokemons, setPokemons] = useState([])

  const handleClick = () => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
    .then(response => response.json())
    .then(pokemons => {
      setPokemons(pokemons)
    })
  }
  


  const generatePokemonElement = (pokemon) => {
    return(
    <li key={pokemon.pokedexId}>
      <img src={pokemon.image} loading="lazy" alt={`Image de ${pokemon.name}`} title={pokemon.name}></img>
      {pokemon.name}
    </li>)
  }

  return(
    <div>
        <button onClick={handleClick}>Chercher les pokemons</button>
        <ul>
            {pokemons.map((pokemon) => generatePokemonElement(pokemon))}
        </ul>
    </div>
  )
}

export default GeneratePokemon