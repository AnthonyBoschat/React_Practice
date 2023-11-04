import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemon(){
    
    const {profilPokemonOn, setProfilPokemonOn} = useContext(StateContext)

    const closeProfil = (event) => {
        if(event.target.id == "profilPokemonOverlay" || event.target.id =="closeProfilButton"){
            setProfilPokemonOn(false)
        }
    }
    if(!profilPokemonOn){
        return null
    }

    return(
        <div id="profilPokemonOverlay" onClick={closeProfil}>
            <div id="profilPokemonBox">
                <div id="profilPokemonHeaderCloseBox" className="childProfilPokemonBox">
                    <button id="closeProfilButton" onClick={closeProfil}>X</button>
                </div>
                <div id="profilPokemonImageBox" className="childProfilPokemonBox">

                </div>
                <div id="profilPokemonPrecisionBox" className="childProfilPokemonBox">

                </div>
            </div>
        </div>
    )

}

export default ProfilPokemon