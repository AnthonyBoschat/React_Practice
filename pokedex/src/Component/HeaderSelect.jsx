import { useState } from "react"

function HeaderSelect(){
    // State
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
        console.log(event.target)
        event.target.classList.contains("boutonTypeSelected") ? event.target.classList.remove("boutonTypeSelected") : event.target.classList.add("boutonTypeSelected")
    }

    const generateBouton = (type) => {
        return(<div onClick={selectType} className={`boutonType ${type.name}`} key={`boutonType_${type.name}`}>{type.name}</div>)
    }
    // Render
    return(
        <div id="headerSelectBox">
            <div id="capsuleBoutonsSelectType">{boutonsSelectType.map((type) => generateBouton(type))}</div>
        </div>
    )
}

export default HeaderSelect