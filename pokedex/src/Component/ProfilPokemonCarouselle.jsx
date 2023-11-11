import React, { useContext, useState } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonCarousselle(){

    /////// STATE /////////
    const {profilPokemon, setProfilPokemon, pokemonsList, fetchAllEvolutionOfThisPokemon} = useContext(StateContext)
    const [carouselContainer, setCarouselContainer] = useState({
        outline: '1px solid black',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        transition: 'all 0.5s'
    })

    /////// METHODE /////////
    const changePositionCarouselContainer = () => {

    }

    const changeFocusOfPokemonEvolution = (event) => {
        const newPokemonToFocus = pokemonsList.filter(pokemon => pokemon.name === event.currentTarget.alt)
        newPokemonToFocus[0].tableauOfEvolution = fetchAllEvolutionOfThisPokemon(newPokemonToFocus[0].name)
        setProfilPokemon(newPokemonToFocus[0])
        changePositionCarouselContainer()
    }   

    const displayImageOfEvolutions = (evolution) => {
        let classe = evolution.name === profilPokemon.name ? "focus" : "unfocus"
        return(
            <img key={`imageCarousselle${evolution.name}`} onClick={changeFocusOfPokemonEvolution} className={classe} src={evolution.image} title={evolution.name} alt={evolution.name} />
        )
    }


    /////// RENDER /////////

    return(
        <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.typeJoin}`}>
            <div className="carouselContainer" style={carouselContainer}>
                {profilPokemon.tableauOfEvolution.map(evolution => displayImageOfEvolutions(evolution))}
            </div>
        </div>
    )
}

export default ProfilPokemonCarousselle;