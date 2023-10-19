import { useState } from "react"
import "../Style/Valid.css"

function Valid(){

    //State
    const [buttonValue, setButtonValue] = useState("Start")

    //Comportement
    const handleClick = () => {
        // On rend la selection de temps incliquable ou cliquable en fonction
        document.querySelectorAll("input").forEach(input => {input.disabled === false ? input.disabled = true : input.disabled = false})
        // On modifie le buttonValue
        buttonValue === "Start" ? setButtonValue("Stop") : setButtonValue("Start")
    }

    //Render
    return(
        <div className="validBox">
            <button onClick={handleClick} className="validInput">{buttonValue}</button>
        </div>
    )
}

export default Valid;