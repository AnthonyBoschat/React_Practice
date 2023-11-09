import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";
import ProfilPokemonName from "./ProfilPokemonName";

function ProfilPokemon(){
    
    //////// STATE //////////
    const {fetchAllEvolutionOfThisPokemon, profilPokemon, setProfilPokemon, pokemonsList, profilDisplay, setProfilDisplay} = useContext(StateContext)






    //////// METHODE //////////

    // Pour fermer l'onglet profil
    const closeProfil = (event) => {
        if(event.target.id == "profilPokemonOverlay" || event.target.id =="closeProfilButton"){
            setProfilDisplay(false)
        }
    }

    // Pour changer l'affichage du pokemon
    const changeProfilWithArrow = (event) => {
        // On récupère la liste de tout les pokemons visibles
        const pokemonsListVisibleTrue = pokemonsList.filter((pokemon) => pokemon.visible === true)
        // On récupère l'index du pokemon en cours de visionnage dans pokemonsListVisibleTrue
        const indexOfThisPokemon = pokemonsList.findIndex((element) => element.name === profilPokemon.name)
        // On récupèe la longueur de la liste pokemon
        const lengthOfPokemonsList = pokemonsListVisibleTrue.length
        // On initialise l'index du prochain pokemon à afficher à null
        let nextPokemonIndex = null
        // S'il clique sur la fléche de droite
        if(event.target.classList.contains("showNextPokemon")){
            
            // On vérifie qu'il ne s'agit pas du dernier pokemon, l'index augmente de 1
            if(indexOfThisPokemon != lengthOfPokemonsList - 1){
                nextPokemonIndex = indexOfThisPokemon + 1
            }
            // S'il s'agit du dernier pokemon, on remontre le premier
            else{
                nextPokemonIndex = 0
            }
        }
        // S'il clique sur la flèche de gauche
        else{
            // On vérifie qu'il ne s'agit pas du premier pokemon, l'index augmente de 1
            if(indexOfThisPokemon != 0){
                nextPokemonIndex = indexOfThisPokemon - 1
            }
            // S'il s'agit du dernier pokemon, on remontre le premier
            else{
                nextPokemonIndex = lengthOfPokemonsList - 1
            }
        }
        // On setup le profil du prochain pokemon à afficher
        const nextPokemonToShow = pokemonsListVisibleTrue[nextPokemonIndex]
        nextPokemonToShow.tableauOfEvolution = fetchAllEvolutionOfThisPokemon(nextPokemonToShow.name)
        // On setState le profil de ce pokemon
        setProfilPokemon(nextPokemonToShow)
    }









    //////// RENDER //////////
    if(!profilDisplay){
        return null
    }

    return(
        <div id="profilPokemonOverlay" onClick={closeProfil}>
            <div id="profilPokemonBox">
                <div id="profilPokemonHeaderCloseBox" className="childProfilPokemonBox">
                    <ProfilPokemonName />
                    <button id="closeProfilButton" onClick={closeProfil}>X</button>
                </div>
                <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.typeJoin}` }>
                    <div className="controle"><i onClick={changeProfilWithArrow} className="fa-solid fa-arrow-left showPreviousPokemon"></i></div>
                    <img src={profilPokemon.image} title={profilPokemon.name} alt={profilPokemon.name} />
                    <div className="controle"><i onClick={changeProfilWithArrow} className="fa-solid fa-arrow-right showNextPokemon"></i></div>
                </div>
                <div id="profilPokemonPrecisionBox" className="childProfilPokemonBox">
                    
                </div>
            </div>
        </div>
    )

}

export default ProfilPokemon