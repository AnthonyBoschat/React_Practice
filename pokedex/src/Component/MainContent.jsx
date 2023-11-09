import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
import ProfilPokemon from "./ProfilPokemon"

function MainContent(){


    //////// STATE /////////
    const {fetchAllEvolutionOfThisPokemon, pokemonsList, setPokemonsList, logoVisible, setLogoVisible, profilPokemon, setProfilPokemon, profilDisplay, setProfilDisplay} = useContext(StateContext)






    //////// METHODE /////////
    const showProfilOfThisPokemon = (pokemon) => {
        pokemon.tableauOfEvolution = fetchAllEvolutionOfThisPokemon(pokemon.name)
        console.log(pokemon.tableauOfEvolution)
        setProfilDisplay(true)
        setProfilPokemon(pokemon)
    }

    const generatePokemonList = (pokemon) => {
        if(pokemon.visible === true){
            return(
                <div onClick={() => showProfilOfThisPokemon(pokemon)} key={`keyCapsule_${pokemon.name}`} className={`capsulePokemonProfil ${pokemon.typeJoin}`}>
                    <img title={pokemon.name} src={pokemon.image} key={`keyImage_${pokemon.name}`} loading="lazy"></img>
                </div>
            ) 
        }
    }






    //////// RENDER /////////
    return(
        <div id="mainContentBox">
            {logoVisible && <div id="logoPokemonBox"><img src={PokemonLogo}></img></div>}
            {!logoVisible && <div id="pokemonsListBox">{pokemonsList.map((pokemon) => generatePokemonList(pokemon))}</div>}
            <ProfilPokemon />
        </div>
    )
}

export default MainContent