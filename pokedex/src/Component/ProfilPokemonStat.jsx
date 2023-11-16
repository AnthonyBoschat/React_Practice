import React, { useContext, useEffect, useState } from "react";
import {StateContext} from "../Context/StateContext";

function ProfilPokemonStat(){

    /////// STATE /////////
    const {profilPokemon, pokemonsList} = useContext(StateContext)
    const [statsDescription, setStatsDescription] = useState([
        {value : profilPokemon.stats.HP,name: "HP", apiName: "HP", style:{width:null}},
        {value : profilPokemon.stats.attack, name: "Attaque", apiName: "attack", style:{width:null}},
        {value : profilPokemon.stats.defense, name: "Défense", apiName: "defense", style:{width:null}},
        {value : profilPokemon.stats.special_attack, name:"Attaque spécial", apiName: "special_attack", style:{width:null}},
        {value : profilPokemon.stats.special_defense, name:"Défense spécial", apiName: "special_defense", style:{width:null}},
        {value : profilPokemon.stats.speed, name:"Vitesse", apiName: "speed", style:{width:null}},
    ])

    /////// METHODE /////////

    const generateStats = (stat) => {
        const maxValue = findMaxStat()
        const taille = changeValueOfStyleWidth(stat, maxValue)
        return(
            <div key={`keyStat${stat.name}`} className="statBox">
                <div className="statName">{stat.name}</div>
                <div className="statProgressBox">
                    <div title={stat.value} style={{width:`${taille}%`, background:`${stat.color}`}} className="progressBar" value={stat.value} max={maxValue}/>
                </div>
                <div className="statValue">
                    {stat.value}
                </div>
            </div>
        )   
    }

    // Retourne une valeur qui sera la nouvelle longueur de la barre
    const changeValueOfStyleWidth = (stat, maxValue) => {
        const pourcentOf = stat.value / maxValue
        const resultat = (pourcentOf * 100)
        return resultat
    }



    // Pour mettre à jours les statistique au changement du pokemon
    useEffect(() => {
        const copyStatsDescription = [...statsDescription]
        copyStatsDescription.map(objet => {
            const apiName = objet.apiName
            objet.value = profilPokemon.stats[apiName]
        })
        setStatsDescription(current => copyStatsDescription)
    }, [profilPokemon])

    // Fonction pour trouver la stat la plus élever
    const findMaxStat = () => {
        const copyStatsDescription = [...statsDescription]
        const controle = copyStatsDescription.sort((a, b) => (a.value - b.value))
        return(controle[controle.length-1].value)
    }


    

    /////// RENDER /////////

    return(
        <div id="profilPokemonPrecisionBox" className="childProfilPokemonBox">
            {statsDescription.map(stat => generateStats(stat))}
        </div>
    )
}

export default ProfilPokemonStat;