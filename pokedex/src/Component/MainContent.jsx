import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
import ProfilPokemon from "./ProfilPokemon"

function MainContent(){
    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible, profilPokemonOn, setProfilPokemonOn} = useContext(StateContext)

    // Methode
    const handleClick = () => {
        // On change le state profilPokemonOn pour indiquer que l'utilisateur veut voir le profil d'un pokemon
        setProfilPokemonOn(true)
    }

    const generatePokemonList = (pokemon) => {
        if(pokemon.visible === true){
           const tableauDeType = pokemon.apiTypes.map((type) => type.name)
            const type = tableauDeType.join("")
            return(
                <div onClick={handleClick} key={`keyCapsule_${pokemon.name}`} className={`capsulePokemonProfil ${type}`}>
                    <img title={pokemon.name} src={pokemon.image} key={`keyImage_${pokemon.name}`} loading="lazy"></img>
                </div>
            ) 
        }
        
    }

    // Render
    return(
        <div id="mainContentBox">
            {logoVisible && <div id="logoPokemonBox"><img src={PokemonLogo}></img></div>}
            {!logoVisible && <div id="pokemonsListBox">{pokemonsList.map((pokemon) => generatePokemonList(pokemon))}</div>}
            <ProfilPokemon />
        </div>
    )
}

export default MainContent