import React from "react";


// Quand il n'y a pas de state, pas forcément besoin de déclarer une classe, on peut faire ceci :

// On lui passe en paramètre la décomposition des props
function Client({client, onDelete})
{
    return(
    <li>
        {client.nom}<button onClick={() => onDelete(client.id)}>Supprimer</button>
    </li>
    )
}

export default Client;


//

/*Avec une classe :
class Client extends Component
{
    render()
    {
        // Récupération des props
        const client = this.props.details
        const handleDelete = this.props.onDelete
        // ou bien
        // const {details, onDelete} = this.props

        return(
        <li>
            {client.nom}<button onClick={() => handleDelete(client.id)}>Supprimer</button>
        </li>
        )
    }
}

*/