import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";

function Resultat(){

    /////// STATE /////////
    const {state} = useContext(StateContext)


    /////// METHODE /////////


    /////// RENDER /////////
    return(
        <div style={state.style}>{state.count}</div>
    )
}

export default Resultat;