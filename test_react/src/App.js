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
    compteur: 0
  }

  // Comportement
  handleClick = () =>
  {
    const clients = this.state.clients.slice()
    clients.push({id: 4, nom: "Anne Dupont"})
    this.setState({clients: clients})
  }





  // Rendu de l'application
  render() // Ce qui est renvoyer à l'ancrage div="root"
  {
    return(
      <div>
        <h1>{this.state.liste_name}</h1>
        <button onClick={this.handleClick}>controle</button>
        <ul>
          {this.state.clients.map(client => (<li>{client.nom} <button>Supprimer</button></li>))}
        </ul>
        <form>
          <input type='text' placeholder='Ajouter un client'/>
          <button>Ajouter</button>
        </form>
      </div>
    )
  }
}

export default App;
