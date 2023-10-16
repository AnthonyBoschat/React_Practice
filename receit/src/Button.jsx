import React, { useContext } from "react";
import ElementContext from "./ElementContext";

function Button({element}) {

    const {listOfElement, updateListOfElement} = useContext(ElementContext)

    async function handleClick(event){
        // On récupère le nom du produit cliqué
        const eventName = event.target.textContent
        // On récupère l'index de l'élément correspondant à ce nom
        const index = listOfElement.findIndex((element) => element.name === eventName)
        // On récupère son nom en Anglais
        const name = listOfElement[index].name
        // On effectue une requêt eà l'API en se sservant de son nom
        // On définie notre clef API, et l'adresse
        const APIkey = "f26bb86aabe743069b136fed5a400204"
        const API_URL = "https://api.spoonacular.com/recipes/complexSearch"
        // On effectue la requête en passant le name comme propriété query
        const url = new URL(`${API_URL}`)
        url.searchParams.append("apiKey", `${APIkey}`)
        url.searchParams.append("query", `${name}`)

        try{
            const response = await fetch (url, {
                methode: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })

            if(!response.ok){
                throw new Error(`Erreur personnel : ${response.statusText}`)
            }

            const data = await response.json()
            console.log(data)

        }catch(error){
            console.error("erreur : ", error.message)
        }
    }

    // Fonction pour changer l'affichage
    function changeDisplay()
    {
        
    }

    
    if(element.hidden === true){
        return
    }else{
        return(<button onClick={handleClick} id={element.id}>{element.name}</button>)
    }
    


}

export default Button;