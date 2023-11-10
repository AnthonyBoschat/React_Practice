import React, { useContext, useState } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonCarousselle(){

    /////// STATE /////////
    const {profilPokemon, setProfilPokemon, pokemonsList, fetchAllEvolutionOfThisPokemon} = useContext(StateContext)
    
    /////// METHODE /////////
    const changeFocusOfPokemonEvolution = (event) => {
        const newPokemonToFocus = pokemonsList.filter(pokemon => pokemon.name === event.currentTarget.alt)
        newPokemonToFocus[0].tableauOfEvolution = fetchAllEvolutionOfThisPokemon(newPokemonToFocus[0].name)
        setProfilPokemon(newPokemonToFocus[0])
    }   

    const displayImageOfEvolutions = (evolution) => {
        const classe = evolution.name === profilPokemon.name ? "focus" : "unfocus"
        return(
            <img key={`imageCarousselle${evolution.name}`} onClick={changeFocusOfPokemonEvolution} className={classe} src={evolution.image} title={evolution.name} alt={evolution.name} />
        )
    }


    /////// RENDER /////////

    return(
        <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.typeJoin}`}>
            {profilPokemon.tableauOfEvolution.map(evolution => displayImageOfEvolutions(evolution))}
        </div>
    )
}

export default ProfilPokemonCarousselle;