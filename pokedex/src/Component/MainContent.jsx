import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
function MainContent(){
    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible} = useContext(StateContext)

    // Methode
    const generatePokemonList = (element) => {
        const tableauDeType = element.apiTypes.map((type) => type.name)
        const type = tableauDeType.join(" ")
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
            {!logoVisible && <div id="pokemonsListBox">{pokemonsList.map((element) => generatePokemonList(element))}</div>}
        </div>
    )
}

export default MainContent