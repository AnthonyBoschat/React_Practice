import React, { useState } from "react";

function Search(){

    // https://www.youtube.com/watch?v=_Hhg7NmmN-c
    // On défini les valeurs nécessaire pour l'api, le lien de l'API et notre clef
    const api = {
        key: "5801a4ae3169257bd132af0d75bbb9f4",
        base: "http://api.openweathermap.org/data/2.5/weather?"
    }

    const [city, setCity] = useState("")

    function updateValue(event){
        setCity(event.target.value)
    }

    function handleSubmit(event){
        // On empêche le rechargement de page
        event.preventDefault()
        // On effectue une requête à l'api, en donnant en get les donnée, ville, metric, et la clef api
        fetch(`${api.base}q=${city}&units=metric&appid=${api.key}`)
        // On récupère la réponse en format json
        .then(response => response.json())
        // Quand on l'a
        .then(result => {
            console.log(result)
            // On récupère la température
            const temperature = result.main.temp
            // On affiche la température
            document.querySelector("#destination").innerHTML = `A ${city} il fait ${temperature} degrés`
        })
        // On réinitialise le champ
        setCity("")
    }

    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="Votre ville..." value={city} type="search" onChange={updateValue}/>
            <input type="submit" value="Chercher"/>
        </form>
    )

}

export default Search;