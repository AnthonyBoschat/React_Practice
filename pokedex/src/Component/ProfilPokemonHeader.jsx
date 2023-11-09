import React from "react";
import ProfilPokemonEvolution from "./ProfilPokemonEvolution";

function ProfilPokemonHeader({closeProfil}){

    /////// STATE /////////


    /////// METHODE /////////


    /////// RENDER /////////

    return(
        <div id="profilPokemonHeaderCloseBox" className="childProfilPokemonBox">
            <ProfilPokemonEvolution />
            <button id="closeProfilButton" onClick={closeProfil}>X</button>
        </div>
    )
}

export default ProfilPokemonHeader;