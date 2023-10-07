import React from 'react';
import './App.css';

class App extends React.Component
{
  // Etat de l'application
  state = 
  {
    liste_name: "Liste des clients",
    clients: 
    [
      {id: 1, nom: "Anthony Boschat"},
      {id: 2, nom: "Maurane Lorjou"},
      {id: 3, nom: "Mathias Charpentier"}
    ],
    nouveau_client : ""

  }

  // Comportement
  // Pour supprimer un client
  handleDelete = (id) =>
  {
    // On créé une copie du tableau du state
    const clients = this.state.clients.slice()

    // Trouve la place du client dans le tableau grâce à son ID
    const index = clients.findIndex((client => client.id === id ))

    // On supprime ce client
    clients.splice(index, 1)

    // On met à jour le state
    this.setState({clients: clients})
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

    // On définie le nouveau client avec ces informations
    const client = {id: id, nom: nom}
    // On créé une copie de ma liste de clients
    const clients = this.state.clients.slice()
    // On insert le nouveau client dans cette copie
    clients.push(client)
    // On remplace la liste de clients du state par cette copie
    this.setState({clients: clients, nouveau_client: ""})
  }

  // Quand l'input change
  handleChange = (event) => 
  {
    // On récupère la valeur de l'input
    const value = event.target.value
    // On change la valeur du state du nouveau_client
    this.setState({nouveau_client: value})
  }





  // Rendu de l'application
  render() // Ce qui est renvoyer à l'ancrage div="root"
  {
    return(
      <div>
        <h1>{this.state.liste_name}</h1>
        <ul>
          {this.state.clients.map(client => (<li>{client.nom} <button onClick={() => this.handleDelete(client.id)}>Supprimer</button></li>))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.nouveau_client} onChange={this.handleChange} type='text' placeholder='Ajouter un client'/>
          <button>Ajouter</button>
        </form>
      </div>
    )
  }
}

export default App;
