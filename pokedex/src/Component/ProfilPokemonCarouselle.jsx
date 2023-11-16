import React, { useContext, useEffect, useState, useRef } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemonCarousselle(){

    /////// STATE /////////
    const {profilPokemon, setProfilPokemon, pokemonsList, fetchAllEvolutionOfThisPokemon} = useContext(StateContext)


    const [calculInformation, setCalculInformation] = useState({
        carouselContainer:null,
        imageFocus:null,
        imageUnfocus:0
    })

    const [carouselContainerStyle, setCarouselContainerStyle] = useState({
        position: "relative",
        left: null,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'all 0.5s'
    })


    /////// METHODE /////////
    // Génère les images de pokemon
    const displayImageOfEvolutions = (evolution) => {
        let classe = evolution.name === profilPokemon.name ? "focus" : "unfocus"
        let ref = evolution.name === profilPokemon.name ? imageFocusRef : imageUnfocusRef
        return(
            <img ref={ref} key={`imageCarousselle${evolution.name}`} onClick={changeFocusOfPokemonEvolution} className={classe} src={evolution.image} title={evolution.name} alt={evolution.name} />
        )
    }
    
    

    // Action après le clique sur une image
    const changeFocusOfPokemonEvolution = (event) => {
        const newPokemonToFocus = pokemonsList.filter(pokemon => pokemon.name === event.currentTarget.alt) // le pokemon cliquer
        newPokemonToFocus[0].tableauOfEvolution = fetchAllEvolutionOfThisPokemon(newPokemonToFocus[0].name) // On récupère sa liste d'évolution
        setProfilPokemon(newPokemonToFocus[0]) // on setState le nouveau profil
    }


    // Récupère la taille de la box carousel / de la grande image / de la petite image -> setState de ces informations dans calculInformation
    const updateCalculInformation = () => {
        if(carouselContainerRef){
            const copyCalculInformation = {...calculInformation} // Copie
            copyCalculInformation.carouselContainer = carouselContainerRef.current.offsetWidth // Nouvelle valeur de la taille du carousel
            copyCalculInformation.imageFocus = imageFocusRef.current.offsetWidth // Taille de la grande image
            if(imageUnfocusRef.current){copyCalculInformation.imageUnfocus = imageUnfocusRef.current.offsetWidth} // S'il y a un pokemon en Unfocus, taille de la petite image, sinon, prend la taille par défaut initialiser
            setCalculInformation(copyCalculInformation) // SetState de ces informations
        } 
    }
    
    // Fonction qui sert à retarder l'execution de updateCalculInformation
    const debounce = (func,wait) => {
        let timeout // timeout = l'instance en cours de l'appelle futur de la prochaine fonction
        return function executedFunction(...args){
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            timeout = setTimeout(later, wait)
        }
    }

    //// useEffect
    // Se lance au montage du composant, et à chaque redimensionnement de la page
    useEffect(() => {
        const debouncedUpdateCalculInformation500 = debounce(updateCalculInformation, 500)
        const debouncedUpdateCalculInformation1 = debounce(updateCalculInformation, 1)
        debouncedUpdateCalculInformation1() // Fonction pour lancer une première fois les récupération nécessaire pour les calcules de carousel
        window.addEventListener("resize", debouncedUpdateCalculInformation500) // Et update ces information au resize de la fenêtre
        return(() => {window.removeEventListener("resize", debouncedUpdateCalculInformation500)}) // Fonction de nettoyage
    }, [])

    // A chaque fois que calculInformation, ou profilPokemon evolue
    useEffect(() => {
        // On récupère l'index du pokemon
        const index = profilPokemon.tableauOfEvolution.findIndex(pokemon => pokemon.name === profilPokemon.name)

        // On récupère les dimensions des images et du carousel
        const dimensionContainerCarousel = calculInformation.carouselContainer
        const dimensionImageLarge = calculInformation.imageFocus
        const dimensionImageSmall = calculInformation.imageUnfocus

        // On calcul le reste
        const reste = dimensionContainerCarousel - dimensionImageLarge
        // On calcul le padding en fonction de l'index du pokemon
        const padding = reste / 2 - (dimensionImageSmall * index)


        // On applique le nouveau padding au style du carousel
        setCarouselContainerStyle(current => {
            const copy = {...current}
            copy.left = padding
            return copy
        })
    }, [profilPokemon, calculInformation])


    

    

    //// REF
    const carouselContainerRef = useRef()
    const imageFocusRef = useRef()
    const imageUnfocusRef = useRef()

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