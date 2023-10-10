import React, {useState} from "react";

function Formulaire(props)
{
    const [nouveau_client, setNouveauClient] = useState("")

    

    // Quand l'input change
    function handleChange(event){
        setNouveauClient(event.target.value)
    }

    // Soumission du formulaire pour ajouter un client
    function handleSubmit(event)
    {
        // On empêche le rechargement de la page
        event.preventDefault()
        // On génère un nouvel id a partie de la date
        const id = new Date().getTime()
        // On définie nom comme la valeur de l'input qui est passer par handleChange
        const nom = nouveau_client

        props.onClientAdd({id, nom})

        setNouveauClient("")
    }


    
    return(
        <form onSubmit={handleSubmit}>
            <input value={nouveau_client} onChange={handleChange} type='text' placeholder='Ajouter un client'/>
            <button type="submit">Ajouter</button>
        </form>
    )
    
}

export default Formulaire;