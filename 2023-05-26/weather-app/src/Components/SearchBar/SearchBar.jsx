import React from "react";

import "./SearchBar.css";

const SearchBar = ({ handleSearch }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.searchInput.value;
    handleSearch(searchValue);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="searchInput" placeholder="Search for a city..." />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchBar;