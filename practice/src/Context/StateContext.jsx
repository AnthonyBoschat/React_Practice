import React, { createContext, useState, useReducer } from "react";
import {initialState, counterReducer} from "../Reducers/storeCounter"

// On définie un contexte
export const StateContext = createContext();

// On définie son provider et les state par défaut
export const StateProvider = ({children}) => {

    const [state, dispatchCounter] = useReducer(counterReducer, initialState)


    ///// RENDER DU CONTEXTE //////
    return(
        <StateContext.Provider value={{state, dispatchCounter}}>
            {children}
        </StateContext.Provider>
    )
}