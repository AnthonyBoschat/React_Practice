import React, { useContext, useState } from "react";
import "./formulaire.css";
import APIContexte from "./contextAPI"
import checkboxContext from "./checkboxContext";


function Formulaire(){
    // On hook le contexte API
    const {APIobject, updateAPIobject} = useContext(APIContexte)
    // On hook le contexte checkboxs
    const {checkboxs, updateCheckboxs} = useContext(checkboxContext)

    // Initilisation
    // Initilisation de l'api et la clef de l'api
    const API = {link:'https://api.openweathermap.org/data/2.5/weather?', key:'7b80af2de8d0c24eeabc0a0740d9e535'}
    // Initialisation de la value champ de recherche
    const [ville, setVille] = useState("")
    // Initialisation de l'état des checkbox
    const [checksList, setCheckList] = useState([
        {id:1, attribut:"temp", name: "Température" , check:false},
        {id:2, attribut:"humidity", name: "Humidité", check:false},
        {id:3, attribut:"wind", name: "Vent", check:false},
        {id:4, attribut:"pressure", name: "Pression atmosphérique", check:false},
        {id:5, attribut:"weather", name: "Nuage", check:false},
    ])

    // Fonction qui génère tout les checkboxs
    function generateAllCheckBox(element){
        return(
            <div key={element.id} className="checkBoxInput">
                <input onChange={handleClickCheckBox} name={element.attribut} id={element.attribut} type="checkbox" />
                <label htmlFor={element.attribut}>{element.name}</label>
            </div>
        )
    }

    // Fonction pour changer le state quand l'utilisateur frappe au clavier
    function handleChangeCity(event){
        setVille(event.target.value)
    }

    // Soumission du formulaire
    async function handleSubmit(event){
        try{

            // On annule le rechargement de la page
            event.preventDefault()
            // On filtre dans la checksList pour récupérer uniquement les check qui sont en true
            const checkboxCheck = checksList.filter((element) => element.check === true) 
            // On récupère les attributs de checkbox coché
            const attributes = checkboxCheck.map((element) => element.attribut)
            // On envoie une requête à l'API
            const response = await fetch(`${API.link}appid=${API.key}&units=metric&q=${ville}`)
            // Si la réponse n'est pas bonne, on provoque une nouvelle erreur attraper dans le catch
            if(!response.ok){
                throw new Error("API response was not ok")
            }
            
            const result = await response.json()
            // On initialise un object vide
            let object = {}
            // On rempli l'objet vide avec la réponse JSON de l'API
            attributes.forEach(element => 
                {
                    if(result[element] !== undefined){
                        if(element === "wind"){
                            object[element] = result[element].speed
                        }
                        else if(element === "weather")
                        {
                            object[element] = result[element][0].icon
                        }
                    }
                    else{
                        object[element] = result.main[element]
                    }
                })
            // On stock la valeur de l'objet dans le contexte
            updateAPIobject(object)
            // On stock les checksbox dans un contexte
            updateCheckboxs(checksList)
        }
        catch(error){
            console.error("Fetch Error", error)
        }
        
    }

    // Clique sur une checkbox -> changement de leurs état
    function handleClickCheckBox(event){
        // On récupère le nom de la checkbox
        const attribut = event.target.name
        // On créé une copie du tableau
        let copy_checksList = [...checksList]
        // On récupère l'index de l'élement dans le tableau qui correspond à ce nom d'attribut
        const index = copy_checksList.findIndex(element => element.attribut === attribut)
        // Ternaire : On change son état checked
        copy_checksList[index].check === false ? copy_checksList[index].check = true : copy_checksList[index].check = false
        // On update le tableau
        setCheckList(copy_checksList)
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="searchInput">
                <label htmlFor="ville">Ville</label>
                <div>
                    <input onChange={handleChangeCity} value={ville} id="ville" type="search"/>
                    <input type="submit"/>
                </div>
            </div>
            {checksList.map((element) => generateAllCheckBox(element))}
        </form>
    )
}

export default Formulaire;