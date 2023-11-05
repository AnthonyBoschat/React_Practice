
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
        // On créé un tableau qui correspond à tout les types selectionner
        const tableauTypeSelected = boutonsSelectType.filter((element) => element.selected === true)
        // On prépare une string de filtre qui va servir à écrire tout les npm de type séléctionner
        let typeSelected = ""
        // On rempli le string de filtre
        tableauTypeSelected.forEach((type) => typeSelected += type.name)
        // Si le nombre de type selectionner est supérieur à 0
        if(tableauTypeSelected.length != 0){
            // Pour chaque objet pokemon de la liste
            copyPokemonsList.forEach(pokemon => {
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
            })
        }
        // Si le nombre de type selectionner n'est pas superieur à 0
        else{
            // Tout les pokemons sont rendu visible
            copyPokemonsList.forEach((pokemon) => {
                // On prépare un tableau qui va contenir les types du pokemon en cours d'instance
                const tableauThisPokemonType = []
                pokemon.apiTypes.forEach(thisPokemonType => {
                    // On rempli le tableau
                    tableauThisPokemonType.push(thisPokemonType.name)
                })
                // On attribut à ce pokemon la clef typeJoin et on modifie sa clef visible
                pokemon.typeJoin = tableauThisPokemonType.join("")
                pokemon.visible = true
            })
        }
        // On setState la liste de pokemon
        setPokemonsList(copyPokemonsList)
    }


    return(
        <StateContext.Provider value={{pokemonsList, setPokemonsList, logoVisible, setLogoVisible, boutonsSelectType, setBoutonsSelectType, filtrage, profilPokemon, setProfilPokemon}}>
            {children}
        </StateContext.Provider>
    )
}