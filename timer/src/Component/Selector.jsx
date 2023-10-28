import { useContext, useState } from "react";
import "../Style/Selector.css"
import { HourMinuteContext } from "../Context/HourMinuteContext";
import { Tools } from "anthonyboschat_tools";

function Selector(){

    
    // State
    const {hourValue, setHourValue, minuteValue, setMinuteValue, secondeValue, setSecondeValue} = useContext(HourMinuteContext)

    // Comportement
    const handleChange = (event) => {
        switch(event.target.id){
            case "inputHour":
                setHourValue(event.target.value)
                break
            case "inputMinute":
                setMinuteValue(event.target.value)
                break
            case "inputSeconde":
                setSecondeValue(event.target.value)
                break
        }
    }

    // Fonction pour gérer la cohérences des valeur des minutes et heures
    const controleValue = () => {

        
        if(hourValue == ""){setHourValue(0)}
        else{
            if(hourValue >= 0){
                if(!Number.isInteger(hourValue)){setHourValue(parseInt(hourValue))}
                else{setHourValue(hourValue)}
            }
            else{
                setHourValue(0)
            } 
        }
        
        
        if(minuteValue == ""){setMinuteValue(0)}
        else{
            if(minuteValue > 59){setMinuteValue(59)}
            else if(minuteValue <= 59 && minuteValue >= 0){
                if(!Number.isInteger(minuteValue)){setMinuteValue(parseInt(minuteValue))}
            }
            else{setMinuteValue(0)}
        }
        

        if(secondeValue == ""){setSecondeValue(0)}
        else{
            if(secondeValue > 59){setSecondeValue(59)}
            else if(secondeValue <= 59 && secondeValue >=0){
                if(!Number.isInteger(secondeValue)){setSecondeValue(parseInt(secondeValue))}
            }
            else{setSecondeValue(0)}  
        }
    }

    // Render
    return(
        <div className="selectorBox">
            <div className="selector">
                <label htmlFor="inputHour">Heure</label>
                <input onBlur={controleValue} onChange={handleChange} value={hourValue} id="inputHour" type="number" min="0" max="24" />
            </div>
            <div className="selector">
                <label htmlFor="inputMinute">Minute</label>
                <input onBlur={controleValue} onChange={handleChange} value={minuteValue} id="inputMinute" type="number" min="0" max="59" />
            </div>
            <div className="selector">
                <label htmlFor="inputSeconde">Seconde</label>
                <input onBlur={controleValue} onChange={handleChange} value={secondeValue} id="inputSeconde" type="number" min="0" max="59" />
            </div>
        </div>
    )
}

export default Selector;