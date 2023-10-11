import React, { useContext, useEffect } from "react";
import contexteAPI from "./Contexte";

function API(){

    const {variable} = useContext(contexteAPI)

    useEffect(() => {
        console.log("controle")
    })
    return(
        <h1>Bonjour</h1>
    )
}

export default API