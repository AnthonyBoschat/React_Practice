import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonCarousselle(){

    /////// STATE /////////
    const {profilPokemon, setProfilPokemon, pokemonsList, fetchAllEvolutionOfThisPokemon} = useContext(StateContext)
    const [valueDecalage, setValueDecalage] = useState(150)
    const [carouselContainer, setCarouselContainer] = useState({
        //outline: '1px solid black',
        position: "relative",
        left: `${valueDecalage}px`,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        transition: 'all 0.5s'
    })
    /////// METHODE /////////

    const changePositionCarouselContainer = (bool) => {
        setValueDecalage(currentValue => 
            {
                if(bool){
                    const copyCarouselContainer = {...carouselContainer}
                    copyCarouselContainer.left = `${currentValue - 135}px`
                    setCarouselContainer(copyCarouselContainer)
                    return(currentValue - 135)
                }
                else{
                    const copyCarouselContainer = {...carouselContainer}
                    copyCarouselContainer.left = `${currentValue + 135}px`
                    setCarouselContainer(copyCarouselContainer)
                    return(currentValue + 135)
                }
            })
    }

    const changeFocusOfPokemonEvolution = (event) => {
        const newPokemonToFocus = pokemonsList.filter(pokemon => pokemon.name === event.currentTarget.alt)
        newPokemonToFocus[0].tableauOfEvolution = fetchAllEvolutionOfThisPokemon(newPokemonToFocus[0].name)
        setProfilPokemon(newPokemonToFocus[0])
        const positionAfter = newPokemonToFocus[0].id > profilPokemon.id
        changePositionCarouselContainer(positionAfter)
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