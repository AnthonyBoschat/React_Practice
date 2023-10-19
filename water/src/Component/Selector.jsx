import { useState } from "react";
import "../Style/Selector.css"

function Selector(){

    // State
    const [hourValue, setHourValue] = useState("")
    const [minuteValue, setMinuteValue] = useState("")

    // Comportement
    const handleChange = (event) => {
        switch(event.target.id){
            case "inputHour":
                setHourValue(event.target.value)
                break
            case "inputMinute":
                setMinuteValue(event.target.value)
                break
        }
    }

    const controleMinuteValue = () => {
        if(minuteValue > 59){setMinuteValue(59)}
    }

    // Render
    return(
        <div className="selectorBox">
            <div className="selector selectHourBox">
                <label htmlFor="inputHour">Heure</label>
                <input onChange={handleChange} value={hourValue} id="inputHour" type="number" min="0" max="24" />
            </div>
            <div className="selector selectMinuteBox">
                <label htmlFor="inputMinute">Minute</label>
                <input onBlur={controleMinuteValue} onChange={handleChange} value={minuteValue} id="inputMinute" type="number" min="0" max="59" />
            </div>
        </div>
    )
}

export default Selector;