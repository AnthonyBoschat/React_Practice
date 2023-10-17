import { useState } from "react";
import "./css/App.css";
import "./css/SearchBar.css";
import SearchBar from "./SearchBar";
import { injectAnimation } from "./global_tools";

function App() {

  return (
      <main>
        <SearchBar />
      </main>
  );
}

export default App;


// <div id="buttonStorage">{listOfElement.map((element) => <Button key={element.id} element={element}/> )}</div> -> Après searchBar