
import React, { createContext, useState } from "react";

// On définie un contexte
export const StateContext = createContext();

// On définie son provider et les state par défaut
export const StateProvider = ({children}) => {
    const [pokemonsList, setPokemonsList] = useState([])
    const [logoVisible, setLogoVisible] = useState(true)


    return(
        <StateContext.Provider value={{pokemonsList, setPokemonsList, logoVisible, setLogoVisible}}>
            {children}
        </StateContext.Provider>
    )
}