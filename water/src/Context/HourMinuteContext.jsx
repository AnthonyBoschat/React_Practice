
import React, { createContext, useState } from "react";

export const HourMinuteContext = createContext();

export const HourMinuteProvider = ({children}) => {
    const [hourValue, setHourValue] = useState("")
    const [minuteValue, setMinuteValue] = useState("")
    const [secondeValue, setSecondeValue] = useState("")

    return(
        <HourMinuteContext.Provider value={{hourValue, setHourValue, minuteValue, setMinuteValue, secondeValue, setSecondeValue}}>
            {children}
        </HourMinuteContext.Provider>
    )
}