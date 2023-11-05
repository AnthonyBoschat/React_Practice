import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemon(){
    
    // State
    const {profilPokemon, setProfilPokemon, pokemonsList, setPokemonsList} = useContext(StateContext)






    // Methode
    // Pour fermer l'onglet profil
    const closeProfil = (event) => {
        if(event.target.id == "profilPokemonOverlay" || event.target.id =="closeProfilButton"){
            const copyProfilPokemon = {...profilPokemon}
            copyProfilPokemon.visible = false
            setProfilPokemon(copyProfilPokemon)
        }
    }

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
        // On créé une copie du tableau du pokemon en cours de visionnage
        const copyProfilPokemon = {...profilPokemon}
        copyProfilPokemon.name = pokemonsListVisibleTrue[nextPokemonIndex].name
        copyProfilPokemon.img = pokemonsListVisibleTrue[nextPokemonIndex].image
        copyProfilPokemon.type = pokemonsListVisibleTrue[nextPokemonIndex].typeJoin
        setProfilPokemon(copyProfilPokemon)
    }









    // Render
    if(!profilPokemon.visible){
        return null
    }

    return(
        <div id="profilPokemonOverlay" onClick={closeProfil}>
            <div id="profilPokemonBox">
                <div id="profilPokemonHeaderCloseBox" className="childProfilPokemonBox">
                    <span>{profilPokemon.name}</span>
                    <button id="closeProfilButton" onClick={closeProfil}>X</button>
                </div>
                <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.type}` }>
                    <div className="controle"><i onClick={changeProfilWithArrow} className="fa-solid fa-arrow-left showPreviousPokemon"></i></div>
                    <img src={profilPokemon.img} title={profilPokemon.name} alt={profilPokemon.name} />
                    <div className="controle"><i onClick={changeProfilWithArrow} className="fa-solid fa-arrow-right showNextPokemon"></i></div>
                </div>
                <div id="profilPokemonPrecisionBox" className="childProfilPokemonBox">

                </div>
            </div>
        </div>
    )

}

export default ProfilPokemon