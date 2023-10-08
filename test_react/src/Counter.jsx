import React, {useState} from "react";

function Counter(props)
{
    // hook usestate
    const tableau = useState(1)
    // useState génère un tableau avec pour element[0] la valeur passer dans la fonction et element[1] une fonction capable de modifier cette valeur
    const [compteur, updateCompteur] = tableau


    const handleChange = () => {
        updateCompteur(compteur + 1)
    }
    
    return(
        <div>
            {compteur} <button onClick={handleChange}>Incrémenter</button>
        </div>
    )
}

export default Counter;