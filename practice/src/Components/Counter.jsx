import React, { useContext, useReducer } from "react";
import {ACTIONS} from "../Reducers/storeCounter"
import { StateContext } from "../Context/StateContext";

function Counter({value}){

    /////// STATE /////////
    const {dispatchCounter} = useContext(StateContext)


    /////// METHODE /////////


    /////// RENDER /////////
    return(
        <main>
            <button onClick={() => dispatchCounter({type:ACTIONS.INCREMENT, payload:{value}})}>Augmenter {value}</button>
            <button onClick={() => dispatchCounter({type:ACTIONS.DECREMENT, payload:{value}})}>Diminuer {value}</button>
        </main>
    )
}

export default Counter;