
import React, { createContext, useState } from "react";

// On définie un contexte
export const StateContext = createContext();

// On définie son provider et les state par défaut
export const StateProvider = ({children}) => {
    // La liste de tout les pokemons
    const [pokemonsList, setPokemonsList] = useState([])
    // Le profil du pokemon en cours de visionnage
    const [profilPokemon, setProfilPokemon] = useState(null)
    // Permet d'afficher ou non le profile d'un pokemon
    const [profilDisplay, setProfilDisplay] = useState(false)
    // Affiche le logo ou non
    const [logoVisible, setLogoVisible] = useState(true)
    // Liste des boutons de générations de pokémons
    const [boutons, setBoutons] = useState([
        {id:1, name:"Première génération", generation:1, selected:false},
        {id:2, name:"Deuxième génération", generation:2, selected:false},
        {id:3, name:"Troisième génération", generation:3, selected:false},
        {id:4, name:"Quatrième génération", generation:4, selected:false},
        {id:5, name:"Cinquième génération", generation:5, selected:false},
        {id:6, name:"Sixième génération", generation:6, selected:false},
        {id:7, name:"Septième génération", generation:7, selected:false},
        {id:8, name:"Huitième génération", generation:8, selected:false},
    ])
    // Liste des boutons de type de pokémons
    const [boutonsSelectType, setBoutonsSelectType] = useState([
        {name:"Feu", selected:false},
        {name:"Plante", selected:false},
        {name:"Eau", selected:false},
        {name:"Normal", selected:false},
        {name:"Poison", selected:false},
        {name:"Vol", selected:false},
        {name:"Insecte", selected:false},
        {name:"Électrik", selected:false},
        {name:"Sol", selected:false},
        {name:"Psy", selected:false},
        {name:"Fée", selected:false},
        {name:"Combat", selected:false},
        {name:"Roche", selected:false},
        {name:"Glace", selected:false},
        {name:"Spectre", selected:false},
        {name:"Dragon", selected:false},
        {name:"Ténèbres", selected:false},
        {name:"Acier", selected:false}
    ]);

    // Fonction qui permet d'afficher les pokémons demander en fonction de leurs type, et de leurs générations
    const filtrage = (pokemonsList) => {
        // On créé une copie de la liste de tout les pokemons
        const copyPokemonsList = [...pokemonsList]

        /////////////////////////////////////////////////
        /////// Recupération des generation selectionner
        /////////////////////////////////////////////////
        const generationSelected = boutons.filter((bouton) => bouton.selected == true)

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////// Modification pour chaque pokemon de la clef generationSelected en fonction des générations choisi
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Si au moin une generation est cliquer
        if(generationSelected.length > 0){
            // On supprime le logo
            setLogoVisible(false)
            // On réinitialise tout les generationSelected à false
            copyPokemonsList.map(pokemon => pokemon.generationSelected = false)
            // On change la clef generationSelected des pokemons qui sont des generations selectionner
            generationSelected.forEach(generation => {
                copyPokemonsList.filter(pokemon =>
                    (pokemon.apiGeneration === generation.generation)
                ).map(pokemon => {
                    pokemon.generationSelected = true
                })
            })


            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Changement de la clef visible selon le type du pokemon et si le pokemon a generationSelected en true
            ////////////////////////////////////////////////////////////////////////////////////////////////////////

            // On créé un tableau qui correspond à tout les types selectionner
            const tableauTypeSelected = boutonsSelectType.filter((element) => element.selected === true)
            // On prépare une string de filtre qui va servir à écrire tout les nom de type séléctionner
            let typeSelected = ""
            // On rempli le string de filtre
            tableauTypeSelected.forEach((type) => typeSelected += type.name)



            // Si le nombre de type selectionner est supérieur à 0
            if(tableauTypeSelected.length != 0){
                // Pour chaque objet pokemon de la liste
                copyPokemonsList.forEach(pokemon => {
                    // Si la génération du pokemon est Selected
                    if(pokemon.generationSelected === true){
                        // On prépare un tableau qui va contenir les types du pokemon en cours d'instance
                        const tableauThisPokemonType = []
                        // Si le pokemon en cours d'instance a moin de type que le nombre de filtre en cours, il est rendu invisible, il ne rentre pas dans les critères de selection
                        if(pokemon.apiTypes.length < tableauTypeSelected.length){pokemon.visible = false}
                        // Si le pokemon en cours d'instance a autant ou plus de type que le nombre de filtre en cours
                        else{
                            // Pour chaque types de ce pokemon
                            pokemon.apiTypes.forEach(thisPokemonType => {
                                // On rempli le tableau
                                tableauThisPokemonType.push(thisPokemonType.name)
                            })
                            // S'il n'y a qu'un seul filtre
                            if(tableauTypeSelected.length === 1){
                                // pour ce pokemon,on verifie si au moin l'un de ces types est includes dans le string de filtre, si oui, renvoie true, sinon false
                                pokemon.visible = tableauThisPokemonType.some(type => {
                                    return typeSelected.includes(type)
                                })
                            // S'il y a plus de 1 filtre
                            }else{
                                // Pour ce pokemon, s'il a un type qui n'est pas includes dans le string de filtre, on renvoie false, sinon true
                                pokemon.visible = tableauThisPokemonType.every(type => {
                                    return typeSelected.includes(type)
                                })
                            } 
                        }
                    }
                    // Si la génération du pokemon n'est pas selected
                    else{
                        pokemon.visible = false
                    }
                })
            }
            // Si le nombre de type selectionner n'est pas superieur à 0
            else{
                // Tout les pokemons sont rendu visible si leurs générations est selected
                copyPokemonsList.forEach((pokemon) => {
                    // Si leurs génération est selected
                    if(pokemon.generationSelected === true){
                        // On prépare un tableau qui va contenir les types du pokemon en cours d'instance
                        const tableauThisPokemonType = []
                        pokemon.apiTypes.forEach(thisPokemonType => {
                            // On rempli le tableau
                            tableauThisPokemonType.push(thisPokemonType.name)
                        })
                        // On attribut à ce pokemon la clef typeJoin et on modifie sa clef visible
                        pokemon.visible = true
                    }
                    // Si leurs générations n'est pas selected
                    else{
                        pokemon.visible = false
                    }
                })
            }
            // On setState la liste de pokemon
            setPokemonsList(copyPokemonsList)
        }
        // Si aucune génération n'est selectionner
        else{
            // On ajoute le logo
            setLogoVisible(true)
        }}
        
    // Fonction qui permet de récupérer, à partir du nom d'un pokemon, un tableau comprenant toute ses évolutions
    const fetchAllEvolutionOfThisPokemon = (pokemonName) => {
        let currentPokemonAnalys = pokemonName
        let controle = true
        let firstPokemonFind = false
        const copyPokemonsList = [...pokemonsList]
        const tableauOfEvolution = []
        while(controle){
            copyPokemonsList.map((pokemon) => {
                if(pokemon.name === currentPokemonAnalys){
                    // Cible les pokemons sans évolution et retro evolution
                    if(pokemon.apiPreEvolution === "none" && pokemon.apiEvolutions.length === 0){
                        tableauOfEvolution.push(pokemon)
                        controle = false
                    }
                    // Si le pokemon a une rétro évolution et qu'on a pas trouver le premier encore, on descend
                    else if(pokemon.apiPreEvolution != "none" && firstPokemonFind === false){
                        currentPokemonAnalys = pokemon.apiPreEvolution.name
                    }
                    // Si le pokemon n'a pas de rétro évolution, et qu'il a une évolution, on a toruver le premier pokemon des evolutions, on monte
                    else if(pokemon.apiPreEvolution === "none" && pokemon.apiEvolutions.length != 0){
                        if(pokemon.apiEvolutions.length === 1){
                            firstPokemonFind = true
                            tableauOfEvolution.push(pokemon)
                            currentPokemonAnalys = pokemon.apiEvolutions[0].name
                        }
                        else{
                            tableauOfEvolution.push(pokemon)
                            pokemon.apiEvolutions.map(evolution => {
                                pokemonsList.map(pokemon => {
                                    if(pokemon.name === evolution.name){
                                        tableauOfEvolution.push(pokemon)
                                    }
                                })
                            })
                            controle = false
                        }
                        
                    }
                    // Si le pokemon a une retro evolution, qu'on a déjà trouver le premier pokemon et qu'il y a encore une évolution, on monte
                    else if(pokemon.apiPreEvolution != "none" && firstPokemonFind === true && pokemon.apiEvolutions.length != 0){
                        tableauOfEvolution.push(pokemon)
                        currentPokemonAnalys = pokemon.apiEvolutions[0].name
                    }
                    // Si le pokemon a une retro evolution, que le premier pokemon a été trouver, et qu'il n'a plus d'évolution futur, on s'arrête
                    else if(pokemon.apiPreEvolution != "none" && firstPokemonFind === true && pokemon.apiEvolutions.length === 0){
                        tableauOfEvolution.push(pokemon)
                        controle = false
                    }
                }
            })
        }
        return tableauOfEvolution
    }


    ///// RENDER DU CONTEXTE //////
    return(
        <StateContext.Provider value={{profilDisplay, setProfilDisplay, fetchAllEvolutionOfThisPokemon, pokemonsList, setPokemonsList, logoVisible, setLogoVisible, boutonsSelectType, setBoutonsSelectType, filtrage, profilPokemon, setProfilPokemon, boutons, setBoutons}}>
            {children}
        </StateContext.Provider>
    )
}