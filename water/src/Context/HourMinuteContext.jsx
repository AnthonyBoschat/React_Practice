
import React, { createContext, useState } from "react";

export const HourMinuteContext = createContext();

export const HourMinuteProvider = ({children}) => {
    const [hourValue, setHourValue] = useState("")
    const [minuteValue, setMinuteValue] = useState("")

    return(
        <HourMinuteContext.Provider value={{hourValue, setHourValue, minuteValue, setMinuteValue}}>
            {children}
        </HourMinuteContext.Provider>
    )
}