import React, { useContext } from "react";
import { ACTIONS } from "../Reducers/storeCounter";
import { StateContext } from "../Context/StateContext";

function ColorChange(){

    /////// STATE /////////
    const {dispatchCounter} = useContext(StateContext)


    /////// METHODE /////////


    /////// REF /////////

    /////// RENDER /////////

    return(
        <select onChange={(event) => dispatchCounter({type:ACTIONS.CHANGECOLOR, payload: event.currentTarget.value})} name="" id="">
            <option value="black">Noir</option>
            <option value="red">Rouge</option>
            <option value="blue">Bleu</option>
        </select>
    )
}

export default ColorChange;