import React, { useContext, useEffect, useState } from "react"
import { StateContext } from "../Context/StateContext"
function MainSidebar(){

    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible, boutonsSelectType, setBoutonsSelectType, filtrage} = useContext(StateContext)
    const [boutons, setBoutons] = useState([
        {id:1, name:"Première génération", generation:1, selected:false},
        {id:2, name:"Deuxième génération", generation:2, selected:false},
        {id:3, name:"Troisième génération", generation:3, selected:false},
        {id:4, name:"Quatrième génération", generation:4, selected:false},
    ])

    // Methode
    const apiRequestPokemonGeneration = (event) => {
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

        // On récupère les boutons selectionner du nouveau state
        const boutonClicked = copyBoutons.filter((bouton) => bouton.selected === true)
        // S'il y a une génération de sélectionner au moin
        if(boutonClicked.length > 0){
            // retourAllFetchAPI est une promesse qui contient les multiples fetch
            const retourAllFetchAPI = boutonClicked.map(bouton =>
                fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${bouton.generation}`)
                    .then(response => {
                        return response.json();
                    })
            );

            // Promise.all : Quand toutes les promesses de retourAllFetchAPI ont été résolu
            Promise.all(retourAllFetchAPI)
            .then(pokemons => {
                // pokemons est un tableau de tableau, récupérer par les multiples fetch, on concatène tout ça dans un seul tableau : allPokemons
                const allPokemons = [].concat(...pokemons);
                // On passe cet unique tableau dans le filtrage
                filtrage(allPokemons);
                setLogoVisible(false);
            })
        } else {
            setLogoVisible(true);
        }
        
    }


    const generateBoutons = (bouton) => {
        return(
            <button key={bouton.id} onClick={apiRequestPokemonGeneration}>{bouton.name}</button>
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