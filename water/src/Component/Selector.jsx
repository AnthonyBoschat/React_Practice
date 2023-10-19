import { useContext, useState } from "react";
import "../Style/Selector.css"
import { HourMinuteContext } from "../Context/HourMinuteContext";

function Selector(){

    
    // State
    const {hourValue, setHourValue, minuteValue, setMinuteValue} = useContext(HourMinuteContext)

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

    // Fonction pour gérer la cohérences des valeur des minutes et heures
    const controleValue = () => {
        if(minuteValue != ""){
            if(minuteValue > 59){setMinuteValue(59)}
            if(minuteValue <= 59){
                if(!Number.isInteger(minuteValue)){setMinuteValue(parseInt(minuteValue))}
            }
        }
        if(hourValue != ""){
            if(!Number.isInteger(hourValue)){setHourValue(parseInt(hourValue))}
        }
        
    }

    // Render
    return(
        <div className="selectorBox">
            <div className="selector selectHourBox">
                <label htmlFor="inputHour">Heure</label>
                <input onBlur={controleValue} onChange={handleChange} value={hourValue} id="inputHour" type="number" min="0" max="24" />
            </div>
            <div className="selector selectMinuteBox">
                <label htmlFor="inputMinute">Minute</label>
                <input onBlur={controleValue} onChange={handleChange} value={minuteValue} id="inputMinute" type="number" min="0" max="59" />
            </div>
        </div>
    )
}

export default Selector;