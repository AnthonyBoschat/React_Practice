import "./style.css";
import Formulaire from "./Formulaire"
import contexteAPI from "./Contexte"
import API from "./API"

function App() {

  const {object, setObject} = useState(null)
  return(
    <contexteAPI.Provider value={{object, setObject}}>
      <main>
        <div><Formulaire /></div>
        <div><API /></div>
      </main>
    </contexteAPI.Provider>
  )
}

export default App;
