import React, { useContext } from "react";
import { ACTIONS } from "../Reducers/storeCounter";
import { StateContext } from "../Context/StateContext";

function DefaultFonction(){

    /////// STATE /////////
    const {dispatchCounter} = useContext(StateContext)


    /////// METHODE /////////


    /////// REF /////////

    /////// RENDER /////////

    return(
        <select onChange={(event) => dispatchCounter({type:ACTIONS.CHANGESIZE, payload:event.currentTarget.value})} name="" id="">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
    )
}

export default DefaultFonction;