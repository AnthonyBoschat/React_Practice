import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";
import ProfilPokemonImage from "./ProfilPokemonImage";
import ProfilPokemonHeader from "./ProfilPokemonHeader";
import ProfilPokemonStat from "./ProfilPokemonStat";

function ProfilPokemon(){
    
    //////// STATE //////////
    const {profilDisplay, setProfilDisplay} = useContext(StateContext)


    //////// METHODE //////////
    // Pour fermer l'onglet profil
    const closeProfil = (event) => {
        if(event.target.id == "profilPokemonOverlay" || event.target.id =="closeProfilButton"){
            setProfilDisplay(false)
        }
    }

    //////// RENDER //////////
    if(!profilDisplay){
        return null
    }

    return(
        <div id="profilPokemonOverlay" onClick={closeProfil}>
            <div id="profilPokemonBox">
                <ProfilPokemonHeader closeProfil={closeProfil} />
                <ProfilPokemonImage />
                <ProfilPokemonStat />
            </div>
        </div>
    )

}

export default ProfilPokemon