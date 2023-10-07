import React, {Component} from "react";

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

export default Client;