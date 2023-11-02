import { useState, useContext, useEffect } from "react"
import { StateContext } from "../Context/StateContext";

function HeaderSelect(){
    // State
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible} = useContext(StateContext)
    const [selectedPokemonsList, setSelectedPokemonsList] = useState([])
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

    // Methode
    const selectType = (event) => {
        event.target.classList.contains("boutonTypeSelected") ? event.target.classList.remove("boutonTypeSelected") : event.target.classList.add("boutonTypeSelected")
        const copyBoutonsSelectType = [...boutonsSelectType]
        const index = copyBoutonsSelectType.findIndex((element) => element.name === event.target.innerHTML)
        copyBoutonsSelectType[index].selected === false ? copyBoutonsSelectType[index].selected = true : copyBoutonsSelectType[index].selected = false
        setBoutonsSelectType(copyBoutonsSelectType)
    }

    const generateBouton = (type) => {
        return(<div onClick={selectType} className={`boutonType ${type.name}`} key={`boutonType_${type.name}`}>{type.name}</div>)
    }

    useEffect(() => {
        const copyPokemonsList = [...pokemonsList]
        const tableauTypeSelected = boutonsSelectType.filter((element) => element.selected === true)
        let typeSelected = ""
        tableauTypeSelected.forEach((type) => typeSelected+= type.name)
        console.log("typejoin", typeSelected)
        console.log(typeSelected)
        if(tableauTypeSelected.length != 0){
            console.log("types qui ont été selected : ",typeSelected)
            console.log("pokemon liste : ", copyPokemonsList)
            copyPokemonsList.forEach(pokemon => {

                const tableauThisPokemonType = []

                if(pokemon.apiTypes.length < tableauTypeSelected.length){pokemon.visible = false}
                else{
                    pokemon.apiTypes.forEach(thisPokemonType => {
                        tableauThisPokemonType.push(thisPokemonType.name)
                    })

                    if(tableauTypeSelected.length === 1){
                        pokemon.visible = tableauThisPokemonType.some(type => {
                            return typeSelected.includes(type)
                        })
                    }else{
                        pokemon.visible = tableauThisPokemonType.every(type => {
                            return typeSelected.includes(type)
                        })
                    } 
                }
            })
            setPokemonsList(copyPokemonsList)
        }
        else{
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