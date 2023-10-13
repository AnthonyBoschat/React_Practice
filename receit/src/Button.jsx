import React, { useContext } from "react";
import ElementContext from "./ElementContext";

function Button({element}) {

    const {listOfElement, updateListOfElement} = useContext(ElementContext)

    function handleClick(event){
        // On récupère le nom du produit cliqué
        const eventName = event.target.textContent
        // On récupère l'index de l'élément correspondant à ce nom
        const index = listOfElement.findIndex((element) => element.name === eventName)
        // On récupère son nom en Anglais
        const name = listOfElement[index].engname
        // On effectue une requêt eà l'API en se sservant de son nom
        // On définie notre clef API, et l'adresse
        const APIkey = "f26bb86aabe743069b136fed5a400204"
        const adress = "https://api.spoonacular.com/recipes/complexSearch"
        // On effectue la requête en passant le name comme propriété query
        fetch(`${adress}?apiKey=${APIkey}&query=${name}`)
        .then((response) => response.json())
        .then(response => {
            console.log(response)
            const image = response.results[0].image
            console.log(image)
            const destination = document.getElementById("destination")
            let new_image = document.createElement("img")
            new_image.src = image
            destination.appendChild(new_image) 
        })



        //const keyAPI = "f26bb86aabe743069b136fed5a400204"
        //fetch("https://api.spoonacular.com/recipes/complexSearch")
    }

    return(
        <button onClick={handleClick} id={element.id}>{element.name}</button>
    );

}

export default Button;