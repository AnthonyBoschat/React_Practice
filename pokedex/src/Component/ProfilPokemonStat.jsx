import React, { useContext, useEffect, useState } from "react"
import {StateContext} from "../Context/StateContext"

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
    function calculateColor(stat, maxValue) {
        // ratio = le pourcentage de la maxValue
        const ratio = stat.value / maxValue 
      
        // On détermine les couleurs du prisme
        const startColor = { r: 0, g: 110, b: 213 } // Bleu
        const endColor = { r: 213, g: 178, b: 0 } // Rouge
      
        // On calcule la nouvelle couleur
        const r = Math.round(startColor.r + ratio * (endColor.r - startColor.r))
        const g = Math.round(startColor.g + ratio * (endColor.g - startColor.g))
        const b = Math.round(startColor.b + ratio * (endColor.b - startColor.b))
      
        // on retourn la nouvelle couleur
        return `rgb(${r},${g},${b})`
    }

    const generateStats = (stat) => {
        const maxValue = findMaxStat()
        const taille = changeValueOfStyleWidth(stat, maxValue)
        const color = calculateColor(stat, maxValue)
        return(
            <div key={`keyStat${stat.name}`} className="statBox">
                <div className="statName">{stat.name}</div>
                <div className="statProgressBox">
                    <div title={stat.value} style={{width:`${taille}%`,background:`${color}`}} className="progressBar" value={stat.value} max={maxValue}/>
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



    // animateValue retourne en réalité un setInterval
    useEffect(() => {
        const animateValue = (objet, startValue, endValue) => {
            // Durée de l'animation
            const duration = 300 
            // Fréquence de rafraichissement
            const frameRate = 10 
            // Nombre d'etape nécessaire
            const totalSteps = duration / frameRate
            // La quantité à ajouter à startValue à chaque intervalle pour atteindre endValue après totalSteps mises à jour.
            const valueIncrement = (endValue - startValue) / totalSteps
        
            // Compteur d'etape et de multiplication pour la nouvelle valeur
            let currentStep = 0
        
            // Un setInterval basé sur le framerate ( toute les 10ms )
            const intervalID = setInterval(() => {
                // On augmente le compteur d'étape
                currentStep++
                // On calcul la nouvelle valeur à implanter
                const newValue = startValue + valueIncrement * currentStep
                
                // On setState les statistique
                setStatsDescription(currentStats => currentStats.map(stat => { // pour chaque objet stat
                    // Si on passe sur la bonne valeur sur laquelle travailler
                    if(stat.apiName === objet.apiName){
                        // updatedValue = Est-ce qu'il reste de la valeur à incrémenter ?
                        // Dans le cas ou il faut décrémenter plutot que incrémenter
                        const updatedValue = valueIncrement > 0 
                        // Si oui, updatedValue = la plus petite des deux valeurs entre newValue et endValue
                        ? Math.floor(Math.min(newValue, endValue)) 
                        // Si non, updatedValue = la plus grande des deux valeurs entre newValue et endValue
                        : Math.floor(Math.max(newValue, endValue))
                        // on return l'objet stat avec la pripriété updated
                        return { ...stat, value: updatedValue }
                    }
                    // Sinon, on return juste l'objet stat tel quelle
                    return stat
                }))
        
                // L'intervalle est vérifié pour voir si la nouvelle valeur a atteint ou dépassé endValue (dans le cas de l'incrémentation) ou si elle est inférieure ou égale à endValue (dans le cas de la décrémentation).
                // Quand newValue est superieur ou egale au goal (incrémentation) ou que newValue est inferieur ou egal au goal (décrémentation)
                if((valueIncrement > 0 && newValue >= endValue) || (valueIncrement < 0 && newValue <= endValue)){
                    // On clean l'interval
                    clearInterval(intervalID)
                    // Mise à jour finale pour s'assurer que la valeur est exactement 'endValue'
                    setStatsDescription(currentStats => currentStats.map(stat => {
                        if (stat.apiName === objet.apiName) {
                            return { ...stat, value: endValue }
                        }
                        return stat
                    }))
                }
            }, frameRate)
        
            return intervalID
        }
        
        // Avant de commencer l'animation, une copie de statsDescription est faite, en préparant les nouvelles valeurs de départ et de fin pour chaque statistique.
        // Préparation des nouvelles valeurs de départ et de fin
        const copyStatsDescription = statsDescription.map(objet => {
            const newStartValue = objet.value
            const newEndValue = profilPokemon.stats[objet.apiName]
            return { ...objet, value: newStartValue, intervalID: animateValue(objet, newStartValue, newEndValue)}
        })
    
        // Mise à jour de l'état avec les nouvelles valeurs initiales et les ID d'intervalle
        setStatsDescription(copyStatsDescription)
    
        // Nettoyage des intervalles lorsque le composant est démonté ou les dépendances changent
        return () => {
        copyStatsDescription.forEach(stat => {
            clearInterval(stat.intervalID)
        })
        }
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

export default ProfilPokemonStat