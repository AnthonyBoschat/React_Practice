import React, { useContext, useEffect, useState } from "react"
import { StateContext } from "../Context/StateContext"
function MainSidebar(){

    ///////// STATE ///////////
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible, boutonsSelectType, setBoutonsSelectType, filtrage, boutons, setBoutons} = useContext(StateContext)






    ///////// METHODE ///////////
    const showPokemonOfGeneration = (event) => {
        // On ajoute ou retire la classe generationSeleted
        event.target.classList.contains("generationSelected") ? event.target.classList.remove("generationSelected") :event.target.classList.add("generationSelected")
        // On créé une copie du tableau des boutons de generation
        const copyBoutons = [...boutons]
        // On change la clef selected en fonction
        copyBoutons.map((bouton) => {
            if(bouton.name === event.target.innerHTML){
                bouton.selected == false ? bouton.selected = true : bouton.selected = false
            }
        })
        // On setState les boutons
        setBoutons(copyBoutons)
        // On filtre la liste de pokemon pour rendre visible ceux qui passent le filtrage
        filtrage(pokemonsList)
    }

    const generateBoutons = (bouton) => {
        return(
            <button key={bouton.id} onClick={showPokemonOfGeneration}>{bouton.name}</button>
        ) 
    }

    const waitingPikachu = () => {
        return(
            <div id="pikachuRunningBox">
                <img id="pikachuRunning" src="https://media.tenor.com/SH31iAEWLT8AAAAi/pikachu-running.gifhttps://media.tenor.com/SH31iAEWLT8AAAAi/pikachu-running.gif" />
            </div>
        ) 
    }
    







    /////////// RENDER //////////////
    return(
        <div id="sidebarBox">
            <div id="boutonsEnglobeBox">
                {pokemonsList.length !== 0 ? boutons.map((bouton) => generateBoutons(bouton)) : waitingPikachu()}
            </div>
        </div>
    )
}

export default MainSidebar