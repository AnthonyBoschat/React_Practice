
import React, { createContext, useState } from "react";

// On définie un contexte
export const StateContext = createContext();

// On définie son provider et les state par défaut
export const StateProvider = ({children}) => {
    const [profilPokemon, setProfilPokemon] = useState({
        visible:false,
        img:null,
        name:null,
        type:null,
    })
    const [pokemonsList, setPokemonsList] = useState([])
    const [logoVisible, setLogoVisible] = useState(true)
    const [boutons, setBoutons] = useState([
        {id:1, name:"Première génération", generation:1, selected:false},
        {id:2, name:"Deuxième génération", generation:2, selected:false},
        {id:3, name:"Troisième génération", generation:3, selected:false},
        {id:4, name:"Quatrième génération", generation:4, selected:false},
    ])
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
    // fonction qui permet de filtrer les pokemons selon les types selectionner et de setState la nouvelle liste
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
                copyPokemonsList.filter(pokemon => {
                    if(pokemon.apiGeneration === generation.generation)return true
                }).map(pokemon => {
                    pokemon.generationSelected = true
                })
            })


            ///////////////////////////////////////////////////////////
            // Changement de la clef visible selon le type du pokemon
            ///////////////////////////////////////////////////////////

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
                        pokemon.typeJoin = tableauThisPokemonType.join("")
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
                        pokemon.typeJoin = tableauThisPokemonType.join("")
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
        }else{
            // On ajoute le logo
            setLogoVisible(true)
        }}
        


    return(
        <StateContext.Provider value={{pokemonsList, setPokemonsList, logoVisible, setLogoVisible, boutonsSelectType, setBoutonsSelectType, filtrage, profilPokemon, setProfilPokemon, boutons, setBoutons}}>
            {children}
        </StateContext.Provider>
    )
}