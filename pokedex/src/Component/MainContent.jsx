import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
function MainContent(){
    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible} = useContext(StateContext)

    // Methode
    const generatePokemonList = (element) => {
        const type = element.apiTypes[0].name
        return(
            <div key={`keyCapsule_${element.name}`} className={`capsulePokemonProfil ${type}`}>
                <img src={element.image} key={`keyImage_${element.name}`} loading="lazy"></img>
            </div>
        )
    }

    // Render
    return(
        <div id="mainContentBox">
            {logoVisible && <div id="logoPokemonBox"><img src={PokemonLogo}></img></div>}
            {pokemonsList.map((element) => generatePokemonList(element))}
        </div>
    )
}

export default MainContent