import "./style.css";
import Formulaire from "./Formulaire"
import API from "./API"
import APIContexte from "./contextAPI"
import checkboxContext from "./checkboxContext";
import { useState } from "react";


function App() {

  const [value, updateValue] = useState(null)

  const contextValue = {
    APIobject: value,
    updateAPIobject: updateValue
  }

  const [checkboxs, updateCheckboxs] = useState(null)

  const contextCheckboxs = {
    checkboxs: checkboxs,
    updateCheckboxs: updateCheckboxs
  }


  return(

    <checkboxContext.Provider value={contextCheckboxs}>
      <APIContexte.Provider value={contextValue}>
        <main>
          <div><Formulaire /></div>
          <div><API /></div>
        </main>
      </APIContexte.Provider> 
    </checkboxContext.Provider>   
  )
}

export default App;
