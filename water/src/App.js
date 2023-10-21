import Logo from './Component/Logo';
import Selector from './Component/Selector';
import Valid from './Component/Valid';
import Input from './Component/Input';
import {Tools} from "anthonyboschat_tools"
import { HourMinuteProvider } from './Context/HourMinuteContext';
import { InputProvider } from './Context/InputContext';
import "./Style/App.css"

function App() {
  return (
    <div id='main'>
      <HourMinuteProvider>
        <InputProvider>
          <Logo />
          <Selector />
          <Input />
          <Valid />
        </InputProvider>
      </HourMinuteProvider>
    </div>
  );
}

export default App;
