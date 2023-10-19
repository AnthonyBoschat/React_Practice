import Logo from './Component/Logo';
import Selector from './Component/Selector';
import Valid from './Component/Valid';
import {Tools} from "anthonyboschat_tools"
import { HourMinuteProvider } from './Context/HourMinuteContext';
import "./Style/App.css"

function App() {
  return (
    <div id='main'>
      <HourMinuteProvider>
        <Logo />
        <Selector />
        <Valid />
      </HourMinuteProvider>
    </div>
  );
}

export default App;
