import React, {Component} from "react";

class Formulaire extends Component
{
    state = {
        nouveau_client : ""
    }

    // Quand l'input change
    handleChange = (event) => 
    {
        // On récupère la valeur de l'input
        // On change la valeur du state du nouveau_client
        this.setState({nouveau_client: event.target.value})
    }

    // Soumission du formulaire pour ajouter un client
    handleSubmit = (event) => 
    {
        // On empêche le rechargement de la page
        event.preventDefault()
        // On génère un nouvel id a partie de la date
        const id = new Date().getTime()
        // On définie nom comme la valeur de l'input qui est passer par handleChange
        const nom = this.state.nouveau_client

        this.props.onClientAdd({id, nom})

        this.setState({nouveau_client : ""})
    }


    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.nouveau_client} onChange={this.handleChange} type='text' placeholder='Ajouter un client'/>
                <button>Ajouter</button>
            </form>
        )
    }
}

export default Formulaire;