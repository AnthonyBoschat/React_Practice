
import React, { createContext, useState } from "react";

export const HourMinuteContext = createContext();

export const HourMinuteProvider = ({children}) => {
    const [hourValue, setHourValue] = useState(0)
    const [minuteValue, setMinuteValue] = useState(0)
    const [secondeValue, setSecondeValue] = useState(0)

    return(
        <HourMinuteContext.Provider value={{hourValue, setHourValue, minuteValue, setMinuteValue, secondeValue, setSecondeValue}}>
            {children}
        </HourMinuteContext.Provider>
    )
}