import { useState, useContext, useEffect } from "react"
import { StateContext } from "../Context/StateContext";

function HeaderSelect(){
    // State
    const {pokemonsList, setPokemonsList} = useContext(StateContext)
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

    ///////////////////// Methode
    // Evenement lors du clique sur un filtre
    const selectType = (event) => {
        event.target.classList.contains("boutonTypeSelected") ? event.target.classList.remove("boutonTypeSelected") : event.target.classList.add("boutonTypeSelected")
        const copyBoutonsSelectType = [...boutonsSelectType]
        const index = copyBoutonsSelectType.findIndex((element) => element.name === event.target.innerHTML)
        copyBoutonsSelectType[index].selected === false ? copyBoutonsSelectType[index].selected = true : copyBoutonsSelectType[index].selected = false
        setBoutonsSelectType(copyBoutonsSelectType)
    }

    // Génération de tout les filtres de types
    const generateBouton = (type) => {
        return(<div onClick={selectType} className={`boutonType ${type.name}`} key={`boutonType_${type.name}`}>{type.name}</div>)
    }

    // Lorsque boutonsSelectType est setstate
    useEffect(() => {
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
            })
            // On setState la liste de pokemon
            setPokemonsList(copyPokemonsList)
        }
        // Si le nombre de type selectionner n'est pas superieur à 0
        else{
            // Tout les pokemons sont rendu visible
            copyPokemonsList.forEach((pokemon) => {
                pokemon.visible = true
            })
            setPokemonsList(copyPokemonsList)
        }
    }, [boutonsSelectType])

    // Render
    return(
        <div id="headerSelectBox">
            <div id="capsuleBoutonsSelectType">{boutonsSelectType.map((type) => generateBouton(type))}</div>
        </div>
    )
}

export default HeaderSelect