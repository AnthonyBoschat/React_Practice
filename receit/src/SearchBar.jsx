import React, { useContext, useState } from "react";
import "./css/SearchBar.css"
import ElementContext from "./ElementContext";

function SearchBar(){

    const [searchBarValue, updatesearchBarValue] = useState("")
    const {listOfElement, updateListOfElement} = useContext(ElementContext)

    // Lorsque la valeur de l'input search change
    function handleChange(event){
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
    }
    
    return(
        <input value={searchBarValue} type="search" onChange={handleChange}></input>
    )
}

export default SearchBar;