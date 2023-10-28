import React, { useState } from "react"
function MainSidebar(){

    // State
    const [boutons, setBoutons] = useState([
        {id:1, name:"Première génération", generation:1},
        {id:2, name:"Deuxième génération", generation:2},
        {id:3, name:"Troisième génération", generation:3},
        {id:4, name:"Quatrième génération", generation:4},
    ])

    // Methode
    const apiRequestPokemonGeneration = (event) => {
        // On récupère le bouton selectionner
        const boutonClicked = boutons.filter((element) => element.name === event.target.innerHTML)
        // On effectue une requête API pour récupérer les pokemon de la génération du boutonClicked
        fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${boutonClicked[0].generation}`)
        .then(response => response.json())
        .then(pokemons => {
            console.log(pokemons)
        })
    }
    const handleClick = (bouton) => {
        return(
            <button key={bouton.id} onClick={apiRequestPokemonGeneration}>{bouton.name}</button>
        )
    }
    // Render
    return(
        <div id="sidebarBox">
            <div id="boutonsEnglobeBox">
                {boutons.map((bouton) => handleClick(bouton))}
            </div>
        </div>
    )
}

export default MainSidebar