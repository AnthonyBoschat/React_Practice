import React, { useContext, useEffect, useState, useRef } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonCarousselle(){

    //// REF
    const carouselContainerRef = useRef(null)
    const imageFocusRef = useRef(null)
    const imageUnfocusRef = useRef(null)

    /////// STATE /////////
    const [calculInformation, setCalculInformation] = useState({
        carouselContainer:null,
        imageFocus:null,
        imageUnfocus:null
    })
    const {profilPokemon, setProfilPokemon, pokemonsList, fetchAllEvolutionOfThisPokemon} = useContext(StateContext)
    const [styleDescription, setStyleDescription] = useState({
        left:0,
    })

    const [carouselContainerStyle, setCarouselContainerStyle] = useState({
        outline: "1px solid red",
        position: "relative",
        left: `${styleDescription.left}px`,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'all 0.5s'
    })
    /////// METHODE /////////
    
    const changePositionCarouselContainer = (bool) => {
        //console.log(calculInformation)
        console.log("quelque chose à faire...")
    }

    const changeFocusOfPokemonEvolution = (event) => {
        const newPokemonToFocus = pokemonsList.filter(pokemon => pokemon.name === event.currentTarget.alt)
        newPokemonToFocus[0].tableauOfEvolution = fetchAllEvolutionOfThisPokemon(newPokemonToFocus[0].name)
        setProfilPokemon(newPokemonToFocus[0])
        const positionAfter = newPokemonToFocus[0].id > profilPokemon.id
        changePositionCarouselContainer(positionAfter)
        updateCalculInformation()
    }

    //
    const displayImageOfEvolutions = (evolution) => {
        let classe = evolution.name === profilPokemon.name ? "focus" : "unfocus"
        let ref = evolution.name === profilPokemon.name ? imageFocusRef : imageUnfocusRef
        return(
            <img ref={ref} key={`imageCarousselle${evolution.name}`} onClick={changeFocusOfPokemonEvolution} className={classe} src={evolution.image} title={evolution.name} alt={evolution.name} />
        )
    }







    // Fonction pour récupérer les informations nécessaire pour le déplacement du carousel
    const updateCalculInformation = () => {
        if(carouselContainerRef){
            const copyCalculInformation = {...calculInformation} // Copie
            copyCalculInformation.carouselContainer = carouselContainerRef.current.offsetWidth // Nouvelle valeur de la taille du carousel
            copyCalculInformation.imageFocus = imageFocusRef.current.offsetWidth
            copyCalculInformation.imageUnfocus = imageUnfocusRef.current.offsetWidth
            setCalculInformation(copyCalculInformation) // SetState de ces informations 
        } 
    }
    
    useEffect(() => {
        updateCalculInformation() // Fonction pour lancer une première fois les récupération nécessaire pour les calcules de carousel
        window.addEventListener("resize", updateCalculInformation) // Et update ces information au resize de la fenêtre
        return(() => {window.removeEventListener("resize", updateCalculInformation)}) // Fonction de nettoyage
    }, [])

    useEffect(() => {

        const index = profilPokemon.tableauOfEvolution.findIndex(pokemon => pokemon.name === profilPokemon.name)
        const rest = calculInformation.carouselContainer - calculInformation.imageFocus
        const paddingLeft = rest / 2
        const mulltiplicateur = (index + 1)
        const newPaddingLeft = 0 + paddingLeft * mulltiplicateur
        const contro = newPaddingLeft - (calculInformation.imageFocus * (index))


        console.log("reste : ",rest)
        console.log(calculInformation)
        /*const copyStyleDescription = {...styleDescription}
        copyStyleDescription.left = paddingLeft
        setStyleDescription(copyStyleDescription)*/
        const copyCarouselContainerStyle = {...carouselContainerStyle}
        copyCarouselContainerStyle.left = contro
        setCarouselContainerStyle(copyCarouselContainerStyle)
    }, [calculInformation])


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