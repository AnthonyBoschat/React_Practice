import React from 'react';
import './App.css';
import Client from "./Client";
import Formulaire from "./Formulaire";

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
    ]
  }

  // Comportement
  // Pour supprimer un client
  handleDelete = (id) =>
  {
    // On créé une copie du tableau du state
    const clients = [...this.state.clients]

    // Trouve la place du client dans le tableau grâce à son ID
    const index = clients.findIndex((client => client.id === id ))

    // On supprime ce client
    clients.splice(index, 1)

    // On met à jour le state
    this.setState({clients})
  }

  // Pour gérer l'ajout d'un client
  handleAdd = (client) => {
    // On créé une copie de ma liste de clients
    const clients = [...this.state.clients]
    // On insert le nouveau client dans cette copie
    clients.push(client)
    // On remplace la liste de clients du state par cette copie
    this.setState({clients}) // équivaux à this.setState({clients : clients}), c'est un raccourci car les deux ont le même nom
  }

  // Rendu de l'application
  render() // Ce qui est renvoyer à l'ancrage div="root"
  {
    return(
      <div>
        <h1>{this.state.liste_name}</h1>
        <ul>
          {this.state.clients.map(client => (<Client details={client} onDelete={this.handleDelete}/>))}
        </ul>
        <Formulaire onClientAdd={this.handleAdd}/>
      </div>
    )
  }
}

export default App;
