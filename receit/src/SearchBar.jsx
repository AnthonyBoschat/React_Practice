import React, { useContext, useState } from "react";
import "./css/SearchBar.css"
import ElementContext from "./ElementContext";

function SearchBar(){
    

    const [searchBarValue, updatesearchBarValue] = useState("")
    const [suggestions, updateSuggestions] = useState ([])
    const {listOfElement, updateListOfElement} = useContext(ElementContext)
    const API_KEY = "f26bb86aabe743069b136fed5a400204"

    // Lorsque la valeur de l'input search change
    async function handleChange(event){
        // On update la value
        let value = event.target.value
        updatesearchBarValue(value)
        if(value.length > 2){
            // On utilise l'API pour récupérer l'aide de la saisie semi-automatique
            const url = new URL(`https://api.spoonacular.com/recipes/autocomplete`)
            url.searchParams.append("apiKey", API_KEY)
            url.searchParams.append("number", "10")
            url.searchParams.append("query", `${event.target.value}`)
            const response = await fetch(url)
            let data = await response.json()
            if(data.length != 0){
                updateSuggestions(data)
            }else{
                data = [{
                    index:0,
                    title:"( Aucune recette )"
                }]
                updateSuggestions(data)
            }
            
        }else{
            updateSuggestions([])
        }
    }
    
    return(
        <div id="searchBar_englobe">
            <div id="searchBar">
                <input list="suggestions" value={searchBarValue} type="search" onChange={handleChange}></input>
            </div>
            {suggestions.length > 0 && (
                    <div id="autocompleteBox">
                        {suggestions.map((suggestion, index) => (<button key={index}>{suggestion.title}</button>))}
                    </div>
                )}
        </div>
    )
}

export default SearchBar;