import Counter from "./Components/Counter";
import ColorChange from "./Components/ColorChange";
import SizeChange from "./Components/SizeChange"
import Resultat from "./Components/Resultat";
import { StateProvider } from "./Context/StateContext";

function App() {

  return (
    <StateProvider>
      <main>
        <Counter value={1} />
        <Counter value={2} />
        <ColorChange />
        <SizeChange />
        <Resultat />
      </main>
    </StateProvider>
  );
}

export default App;
