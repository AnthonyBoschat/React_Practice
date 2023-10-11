import React, { useState } from "react";
import "./formulaire.css";


function Formulaire(){

    // Initialisation de la value champ de recherche
    const [ville, setVille] = useState("")
    const [checksList, setCheckList] = useState([
        {id:1, attribut:"temperature", name: "Température" , check:false},
        {id:2, attribut:"humiditer", name: "Humidité", check:false},
        {id:3, attribut:"vent", name: "Vent", check:false},
        {id:4, attribut:"pression", name: "Pression atmosphérique", check:false},
        {id:5, attribut:"nuage", name: "Nuage", check:false},
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
    function handleSubmit(event){
        event.preventDefault()
        console.log(ville)
        setVille("")
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