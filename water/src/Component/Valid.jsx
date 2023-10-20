import { useState, useContext } from "react"
import "../Style/Valid.css"
import { HourMinuteContext } from "../Context/HourMinuteContext"
import {Tools} from "anthonyboschat_tools"

function Valid(){

    //State
    const {hourValue, setHourValue, minuteValue, setMinuteValue, secondeValue, setSecondeValue} = useContext(HourMinuteContext)
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
        let seconde = secondeValue
        hour === "" ? hour = 0 : hour = hour
        minute === "" ? minute = 0 : minute = minute
        const decompte = (hourValue * 60 * 60) + (minuteValue * 60) + seconde
        // Lance la décrémentation du compte à rebourd ( a etudier, par chatGPT )
        setInterval(() => {
            setSecondeValue(secondeValue => {
                if (secondeValue === 0) {
                    setMinuteValue(minuteValue => {
                        if (minuteValue === 0) {
                            setHourValue(hourValue => hourValue - 1);
                            return 59;  // Réinitialiser minuteValue à 59
                        }
                        return minuteValue - 1;
                    });
                    return 59;  // Réinitialiser secondeValue à 59
                }
                return secondeValue - 1;
            });
        }, 1000);
        // Lance le son à la fin du compte à rebourd
        setTimeout(() => {
            const audio = new Audio("https://lasonotheque.org/UPLOAD/mp3/0001.mp3")
            audio.play()
        }, decompte*1000);
        
    }

    //Render
    return(
        <div className="validBox">
            <button onClick={handleClick} className="validInput">{buttonValue}</button>
        </div>
    )
}

export default Valid;