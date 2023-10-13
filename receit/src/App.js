import { useState } from "react";
import "./css/App.css"
import Button from "./Button"

function App() {

  const [listOfElement, update_listOfElement] = useState([
    {id: 1, name: "Cookie"},
    {id: 2, name: "Chantilly"},
    {id: 3, name: "Crême anglaise"},
  ])

  

  return (
    <main>
      {listOfElement.map((element) => <Button key={element.id} element={element}/> )}
    </main>
  );
}

export default App;
