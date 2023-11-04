import React, { useContext } from "react";
import { StateContext } from "../Context/StateContext";

function ProfilPokemon(){
    
    const {profilPokemon, setProfilPokemon} = useContext(StateContext)

    const closeProfil = (event) => {
        if(event.target.id == "profilPokemonOverlay" || event.target.id =="closeProfilButton"){
            const copyProfilPokemon = {...profilPokemon}
            copyProfilPokemon.visible = false
            setProfilPokemon(copyProfilPokemon)
        }
    }
    if(!profilPokemon.visible){
        return null
    }

    return(
        <div id="profilPokemonOverlay" onClick={closeProfil}>
            <div id="profilPokemonBox">
                <div id="profilPokemonHeaderCloseBox" className="childProfilPokemonBox">
                    <span>{profilPokemon.name}</span>
                    <button id="closeProfilButton" onClick={closeProfil}>X</button>
                </div>
                <div id="profilPokemonImageBox" className={`childProfilPokemonBox ${profilPokemon.type}` }>
                    <img src={profilPokemon.img} title={profilPokemon.name} alt={profilPokemon.name} />
                </div>
                <div id="profilPokemonPrecisionBox" className="childProfilPokemonBox">

                </div>
            </div>
        </div>
    )

}

export default ProfilPokemon