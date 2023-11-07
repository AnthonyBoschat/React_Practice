import React, { useContext, useEffect, useState } from "react"
import { StateContext } from "../Context/StateContext"
function MainSidebar(){

    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible, boutonsSelectType, setBoutonsSelectType, filtrage, boutons, setBoutons} = useContext(StateContext)

    // Methode
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
        filtrage(pokemonsList)
    }

    // Fonction qui récupère toute la liste des pokemons au chargement de la page
    useEffect(() => {
        fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
        .then(response => response.json())
        .then(pokemons => {
            pokemons.forEach(pokemon => {
                pokemon.visible = false
                pokemon.generationSelected = false
            })
            setPokemonsList(pokemons)
        })
    }, [])
    
    const generateBoutons = (bouton) => {
        return(
            <button key={bouton.id} onClick={showPokemonOfGeneration}>{bouton.name}</button>
        )
    }

    // Render
    return(
        <div id="sidebarBox">
            <div id="boutonsEnglobeBox">
                {boutons.map((bouton) => generateBoutons(bouton))}
            </div>
        </div>
    )
}

export default MainSidebar