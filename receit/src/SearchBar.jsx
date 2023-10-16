import React, { useContext, useState } from "react";
import "./css/SearchBar.css"
import ElementContext from "./ElementContext";

function SearchBar(){

    const [searchBarValue, updatesearchBarValue] = useState("")
    const {listOfElement, updateListOfElement} = useContext(ElementContext)
    const API_KEY = "f26bb86aabe743069b136fed5a400204"

    // Lorsque la valeur de l'input search change
    async function handleChange(event){
        // On update la value
        updatesearchBarValue(event.target.value)
        // On utilise l'API pour récupérer l'aide de la saisie semi-automatique
        const url = new URL(`https://api.spoonacular.com/recipes/autocomplete`)
        url.searchParams.append("apiKey", API_KEY)
        url.searchParams.append("number", "10")
        url.searchParams.append("query", `${event.target.value}`)
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
    }
    
    return(
        <input value={searchBarValue} type="search" onChange={handleChange}></input>
    )
}

export default SearchBar;

/* Dans handleChange

// On update la value
        updatesearchBarValue(event.target.value)
        // On créé une copie de la liste des éléments
        const copy_listOfElement = [...listOfElement]
        // On cherche les éléments dans les boutons qui correspondent, on efface les autres
        copy_listOfElement.forEach(element => {
            if(!element.name.toLowerCase().includes(event.target.value.toLowerCase()))
            {
                element.hidden = true
            }
            else{
                element.hidden = false
            }
        updateListOfElement(copy_listOfElement)
        })

*/