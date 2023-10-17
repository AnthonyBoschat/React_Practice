import React, { useContext, useState } from "react";


function SearchBar(){
    

    const [searchBarValue, updatesearchBarValue] = useState("")
    const [suggestions, updateSuggestions] = useState ([])
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
                console.log(data)
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

    function generateResultDiv(suggestion){
        return(
            <div>{suggestion.title}</div>
        )
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
            <div id="resultSearch">
                {suggestions.map((suggestion) => generateResultDiv(suggestion))}
            </div>
        </div>
    )
}

export default SearchBar;