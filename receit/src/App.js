import { useState } from "react";
import "./css/App.css"
import Button from "./Button"
import ElementContext from "./ElementContext";

function App() {

  const [listOfElement, updateListOfElement] = useState([
    {id: 1, name: "Cookie", engname: "Cookie"},
    {id: 2, name: "Tarte aux pommes", engname: "Apple pie"},
    {id: 3, name: "Yaourt", engname: "Yogurt"},
  ])

  const valueElementContext = {
    listOfElement,
    updateListOfElement
  }

  return (
    <ElementContext.Provider value={valueElementContext}>
      <main>
        {listOfElement.map((element) => <Button key={element.id} element={element}/> )}
        <div id="destination"></div>
      </main>
    </ElementContext.Provider>  
  );
}

export default App;
