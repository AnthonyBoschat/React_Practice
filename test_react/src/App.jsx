import React, { useState } from 'react';
import Client from "./Client";
import Formulaire from "./Formulaire";

const App = () =>
{
  const liste_name = "Liste des clients"

  const [clients, setClients] = useState([
    {id: 1, nom: "Anthony Boschat"},
    {id: 2, nom: "Maurane Lorjou"},
    {id: 3, nom: "Mathias Charpentier"}
  ])

  // Comportement
  // Pour supprimer un client
  const handleDelete = (id) =>{
    // On créé une copie du tableau du state
    const copyClients = [...clients]
    // Trouve la place du client dans le tableau grâce à son ID
    const index = copyClients.findIndex((client => client.id === id ))
    // On supprime ce client
    copyClients.splice(index, 1)
    // On met à jour le state
    setClients(copyClients)
  }

  // Pour gérer l'ajout d'un client
  const handleAdd = (client) => {
    // On créé une copie de ma liste de clients
    const copyClients = [...clients]
    // On insert le nouveau client dans cette copie
    copyClients.push(client)
    // On remplace la liste de clients du state par cette copie
    setClients(copyClients) // équivaux à this.setState({clients : clients}), c'est un raccourci car les deux ont le même nom
  }

  // Rendu de l'application
  
  return(
    <div>
      <h1>{liste_name}</h1>
      <ul>
        {clients.map(client => <Client client={client} onDelete={handleDelete}/>)}
      </ul>
      <Formulaire onClientAdd={handleAdd}/>
    </div>
  )
}

export default App;
