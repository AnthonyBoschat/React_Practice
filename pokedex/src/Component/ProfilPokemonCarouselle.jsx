import React, { useContext, useEffect, useState, useRef } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonCarousselle(){

    //// REF
    const carouselContainerRef = useRef(null)

    /////// STATE /////////
    const [calculInformation, setCalculInformation] = useState({
        carouselContainer:null
    })
    const {profilPokemon, setProfilPokemon, pokemonsList, fetchAllEvolutionOfThisPokemon} = useContext(StateContext)
    const [styleDescription, setStyleDescription] = useState({
        left:0,
        gap:15,
    })
    const [carouselContainerStyle, setCarouselContainer] = useState({
        outline: '1px solid black',
        position: "relative",
        left: `${styleDescription.left}px`,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: `${styleDescription.gap}px`,
        transition: 'all 0.5s'
    })
    /////// METHODE /////////
    
    const changePositionCarouselContainer = (bool) => {
        console.log(calculInformation)
        console.log("quelque chose à faire...")
    }

    const changeFocusOfPokemonEvolution = (event) => {
        const newPokemonToFocus = pokemonsList.filter(pokemon => pokemon.name === event.currentTarget.alt)
        newPokemonToFocus[0].tableauOfEvolution = fetchAllEvolutionOfThisPokemon(newPokemonToFocus[0].name)
        setProfilPokemon(newPokemonToFocus[0])
        const positionAfter = newPokemonToFocus[0].id > profilPokemon.id
        changePositionCarouselContainer(positionAfter)
    }   

    //
    const displayImageOfEvolutions = (evolution) => {
        let classe = evolution.name === profilPokemon.name ? "focus" : "unfocus"
        return(
            <img key={`imageCarousselle${evolution.name}`} onClick={changeFocusOfPokemonEvolution} className={classe} src={evolution.image} title={evolution.name} alt={evolution.name} />
        )
    }

    // Fonction pour récupérer les informations nécessaire pour le déplacement du carousel
    const updateCalculInformation = () => {
        if(carouselContainerRef){
            const copyCalculInformation = {...calculInformation} // Copie
            copyCalculInformation.carouselContainer = carouselContainerRef.current.offsetWidth // Nouvelle valeur de la taille du carousel
            setCalculInformation(copyCalculInformation) // SetState de ces informations 
        } 
    }

    
    useEffect(() => {
        updateCalculInformation() // Fonction pour lancer une première fois les récupération nécessaire pour les calcules de carousel
        window.addEventListener("resize", updateCalculInformation) // Et update ces information au resize de la fenêtre

        return(() => {window.removeEventListener("resize", updateCalculInformation)}) // Fonction de nettoyage
    }, [])
    /////// RENDER /////////

    return(
        <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.typeJoin}`}>
            <div ref={carouselContainerRef} className="carouselContainer" style={carouselContainerStyle}>
                {profilPokemon.tableauOfEvolution.map(evolution => displayImageOfEvolutions(evolution))}
            </div>
        </div>
    )
}

export default ProfilPokemonCarousselle;