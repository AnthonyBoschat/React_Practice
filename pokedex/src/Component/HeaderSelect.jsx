import { useState, useContext, useEffect } from "react"
import { StateContext } from "../Context/StateContext";

function HeaderSelect(){
    // State
    const {pokemonsList, setPokemonsList, boutonsSelectType, setBoutonsSelectType, filtrage} = useContext(StateContext)

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
        filtrage(pokemonsList)
    }, [boutonsSelectType])

    // Render
    return(
        <div id="headerSelectBox">
            <div id="capsuleBoutonsSelectType">{boutonsSelectType.map((type) => generateBouton(type))}</div>
        </div>
    )
}

export default HeaderSelect