import { useState } from "react";
import "./css/App.css";
import Button from "./Button";
import ElementContext from "./ElementContext";
import SearchBar from "./SearchBar";
import "./css/ReceitStorage.css";
import { injectAnimation } from "./global_tools";
import ReceitStorage from "./ReceitStorage";

function App() {

  const [listOfElement, updateListOfElement] = useState([
    {id: 1, name: "Cookie", hidden: false},
    {id: 2, name: "Apple pie", hidden: false},
    {id: 3, name: "Yogurt", hidden: false},
  ])

  const valueElementContext = {
    listOfElement,
    updateListOfElement
  }



  return (
    <ElementContext.Provider value={valueElementContext}>
      <main>
        <ReceitStorage />
        <div id="searchBar"><SearchBar /></div>
      </main>
    </ElementContext.Provider>  
  );
}

export default App;


// <div id="buttonStorage">{listOfElement.map((element) => <Button key={element.id} element={element}/> )}</div> -> Après searchBar