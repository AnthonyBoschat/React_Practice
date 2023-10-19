import Logo from './Component/Logo';
import Selector from './Component/Selector';
import Valid from './Component/Valid';
import {Tools} from "anthonyboschat_tools"
import "./Style/App.css"

function App() {
  return (
    <div id='main'>
      <Logo />
      <Selector />
      <Valid />
    </div>
  );
}

export default App;
