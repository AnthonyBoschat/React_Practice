import { useState, useContext } from "react"
import "../Style/Valid.css"
import { HourMinuteContext } from "../Context/HourMinuteContext"

function Valid(){

    //State
    const {hourValue, setHourValue, minuteValue, setMinuteValue} = useContext(HourMinuteContext)
    const [buttonValue, setButtonValue] = useState("Start")

    //Comportement
    const handleClick = () => {
        // On rend la selection de temps incliquable ou cliquable en fonction
        document.querySelectorAll("input").forEach(input => {input.disabled === false ? input.disabled = true : input.disabled = false})
        // On modifie le buttonValue
        buttonValue === "Start" ? setButtonValue("Stop") : setButtonValue("Start")
        // On determine le nombre de seconde avant la fin du décompte
        // On créé des copies du value est heures et minutes
        let hour = hourValue
        let minute = minuteValue
        console.log(hour)
        console.log(minute)
        hour === "" ? hour = 0 : hour = hour
        minute === "" ? minute = 0 : minute = minute
        const secondes = (hourValue * 60 * 60) + (minuteValue * 60)
        
    }

    //Render
    return(
        <div className="validBox">
            <button onClick={handleClick} className="validInput">{buttonValue}</button>
        </div>
    )
}

export default Valid;