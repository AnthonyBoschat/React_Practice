import { useState, useContext, useRef, useEffect } from "react"
import "../Style/Valid.css"
import { HourMinuteContext } from "../Context/HourMinuteContext"
import {Tools} from "anthonyboschat_tools"
import { InputContext } from "../Context/InputContext"

function Valid(){

    //State
    const {inputValue, setInputValue} = useContext(InputContext)
    const {hourValue, setHourValue, minuteValue, setMinuteValue, secondeValue, setSecondeValue} = useContext(HourMinuteContext)
    const [buttonValue, setButtonValue] = useState("Start")

    const [baseHourValue, setBaseHourValue] = useState("")
    const [baseMinuteValue, setBaseMinuteValue] = useState("")
    const [baseSecondeValue, setBaseSecondeValue] = useState("")

    const intervalRef = useRef(null)
    const timeoutRef = useRef(null)
    const audioRef = useRef(null)

    //Comportement
    const handleClick = () => {

        // On rend la selection de temps incliquable ou cliquable en fonction, et l'input text
        document.querySelectorAll("input").forEach(input => {
            input.disabled === false ? input.disabled = true : input.disabled = false
            !input.classList.contains("disabled") ? input.classList.add("disabled") : input.classList.remove("disabled")
        })

        // On modifie le buttonValue
        buttonValue === "Start" ? setButtonValue("Stop") : setButtonValue("Start")

        switch(buttonValue){
            case "Start":
                // On modifie le buttonValue
                // On determine le nombre de seconde avant la fin du décompte
                // On créé des copies du value est heures et minutes, et on calcule le decompte
                let hour = hourValue
                let minute = minuteValue
                let seconde = secondeValue
                // hour === "" ? hour = 0 : hour = hour
                // minute === "" ? minute = 0 : minute = minute
                const decompte = (hourValue * 60 * 60) + (minuteValue * 60) + seconde
                // On stock les value de base des heures et minute dans le state base
                setBaseHourValue(hour)
                setBaseMinuteValue(minute)
                setBaseSecondeValue(seconde)
                // Lance la décrémentation du compte à rebourd
                intervalRef.current = setInterval(() => {
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
                timeoutRef.current = setTimeout(() => {
                    audioRef.current = new Audio("https://lasonotheque.org/UPLOAD/mp3/0001.mp3")
                    audioRef.current.loop = true
                    audioRef.current.play()

                    // On cancel l'interval
                    clearInterval(intervalRef.current)
                    // On change le state du valid
                    setButtonValue("Start")
                    // On remet les inputs en clair
                    document.querySelectorAll("input").forEach(input => {
                        input.disabled === false ? input.disabled = true : input.disabled = false
                        !input.classList.contains("disabled") ? input.classList.add("disabled") : input.classList.remove("disabled")
                    })
                    // On remet les valeurs d'origine du state des selecteurs
                    setHourValue(hour)
                    setMinuteValue(minute)
                    setSecondeValue(seconde)
                    // On lance quasi immédiatement après un windows.alert ( besoin d'un timeout sinon il se lance avant le son )
                    setTimeout(() => {
                        let messageAlert = null
                        inputValue == "" ? messageAlert = "Fin du timer" : messageAlert = inputValue
                        window.alert(messageAlert)
                        // Execution du script seulement après windows.alert
                        audioRef.current.pause()
                        audioRef.current.currentTime = 0
                    }, 100);
                    
                }, decompte*1000);
                break


            case "Stop":
                // On cancel le timeout et l'interval
                clearTimeout(timeoutRef.current)
                clearInterval(intervalRef.current)
                // On remet les valeurs d'origine au state
                setHourValue(baseHourValue)
                setMinuteValue(baseMinuteValue)
                setSecondeValue(baseSecondeValue)
                break
        }
    }

    //Render
    return(
        <div className="validBox">
            <button onClick={handleClick} className="validInput">{buttonValue}</button>
        </div>
    )
}

export default Valid;