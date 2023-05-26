import React from 'react';
import { useState } from 'react';

import './App.css';

import SearchBar from "./Components/SearchBar/SearchBar";
import WeatherDisplay from "./Components/WeatherDisplay/WeatherDisplay";

function App() {
  const [search, setSearch] = useState("");


  const handleSearch = (search) => {
    setSearch(search.toLowerCase());
    console.log(search);
  };

  return (
    <>
      <div className="App">
      <SearchBar handleSearch={handleSearch}/>
      <WeatherDisplay search={search}/>
      </div>
    </>
  );
}

export default App;
