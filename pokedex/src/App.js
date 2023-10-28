import "./Css/main.css"
import Header from "./Component/Header";
import Main from "./Component/Main";
import { StateProvider } from "./Context/StateContext";
function App() {
  return (
    <div id="APP">
      <StateProvider>
        <Header />
        <Main />
      </StateProvider>
    </div>
  );
}

export default App;
