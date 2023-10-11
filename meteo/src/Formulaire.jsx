import React, { useState } from "react";
import "./formulaire.css";


function Formulaire(){

    // Initialisation de la value champ de recherche
    const [ville, setVille] = useState("")
    const [checksList, setCheckList] = useState([
        {attribut:"temperature", name: "Température" ,check:false},
        {attribut:"humiditer", name: "Humiditer", check:false},
        {attribut:"vent", name: "Vent", check:false},
        {attribut:"pression", name: "Pression", check:false},
        {attribut:"nuage", name: "Nuage", check:false},
    ])

    // Fonction qui génère tout les checkboxs
    function generateAllCheckBox(element){
        return(
            <div className="checkBoxInput">
                <input id={element.attribut} type="checkbox" />
                <label htmlFor={element.attribut}>{element.name}</label>
            </div>
        )
    }

    // Fonction pour changer le state quand l'utilisateur frappe au clavier
    function handleChangeCity(event){
        setVille(event.target.value)
    }

    // Soumission du formulaire
    function handleSubmit(event){
        event.preventDefault()
        console.log(ville)
        setVille("")
    }

    // Clique sur une checkbox -> changement de leurs état
    function handleClickCheckBox(event){
        console.log("controle")
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