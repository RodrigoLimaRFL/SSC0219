import './App.css';

import React, { useState } from "react";

import Names from './Components/Names';

function App() {
  const names = ['Fulano', 'Mengano', 'Sutano', 'Perengano', 'Zutano', 'Zuta', 'Beltrano', 'Cicrano', 'Sicrano', 'Jó', 'Jesus', 'Maomé', 'Buda', 'Krishna', 'Vishnu', 'Shiva', 'Brahma', 'Ganesh', 'Lakshmi', 'Durga'];

  names.sort();

  const [inputText, setInputText] = useState('');
  const [filteredNamesList, setFilteredNamesList] = useState(names.map((element) => (
    <Names> {element} </Names>
  )));

  let inputHandler = (event) => {
    let lowerCaseInput = event.target.value.toLowerCase();
    setInputText(lowerCaseInput);
    const filteredNames = names.filter((element) => element.toLowerCase().includes(lowerCaseInput));
    setFilteredNamesList(filteredNames.map((element) => (
      <Names> {element} </Names>
    )));
  }
  return (
    <div id="app" class="container-fluid">
      <h1>React Search</h1>
      
      <div class="form-group">
        <input type="text" class="form-control"
               placeholder="Search term" onChange={inputHandler}/>
      </div>
      
      <div class="result-container-2-o-inimigo-agr-eh-outro">
        <h2>Results<span></span></h2>
        <ul class="list-group">
          {filteredNamesList}
        </ul>
      </div>
      
    </div>

  );
}

export default App;
