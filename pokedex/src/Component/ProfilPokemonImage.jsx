import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonImage(){

    /////// STATE /////////
    const {pokemonsList, fetchAllEvolutionOfThisPokemon, setProfilPokemon, profilPokemon} = useContext(StateContext)


    /////// METHODE /////////
    // Pour changer l'affichage du pokemon
    const changeProfilWithArrow = (event) => {
        // On récupère la liste de tout les pokemons visibles
        const pokemonsListVisibleTrue = pokemonsList.filter((pokemon) => pokemon.visible === true)
        // On récupère l'index du pokemon en cours de visionnage dans pokemonsListVisibleTrue
        const indexOfThisPokemon = pokemonsListVisibleTrue.findIndex((element) => element.name === profilPokemon.name)
        // On récupèe la longueur de la liste pokemon
        const lengthOfPokemonsList = pokemonsListVisibleTrue.length
        // On initialise l'index du prochain pokemon à afficher à null
        let nextPokemonIndex = null
        // S'il clique sur la fléche de droite
        if(event.currentTarget.classList.contains("showNextPokemon")){
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


    /////// RENDER /////////

    return(
        <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.typeJoin}` }>
            <div className="controle"><i onClick={changeProfilWithArrow} className="fa-solid fa-arrow-left showPreviousPokemon"></i></div>
            <img src={profilPokemon.image} title={profilPokemon.name} alt={profilPokemon.name} />
            <div className="controle"><i onClick={changeProfilWithArrow} className="fa-solid fa-arrow-right showNextPokemon"></i></div>
        </div>
    )
}

export default ProfilPokemonImage;