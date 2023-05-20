import React, { useState } from 'react';
import './Search.css';
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      return;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    // Check if the search text already exists in recent searches
    const existingIndex = recentSearches.findIndex(search => search.toLowerCase() === lowerCaseSearchText);

    if (existingIndex !== -1) {
      // If the search text exists, remove it from its current position
      const updatedSearches = [
        recentSearches[existingIndex],
        ...recentSearches.slice(0, existingIndex),
        ...recentSearches.slice(existingIndex + 1)
      ];
      setRecentSearches(updatedSearches);
    } else {
      // Add the search text to the top of recent searches
      const updatedSearches = [searchText, ...recentSearches.slice(0, 9)];
      setRecentSearches(updatedSearches);
    }

    // Clear the search input
    setSearchText('');
  };

  const handleDeleteSearch = (search) => {
    // Delete the search from recent searches
    const updatedSearches = recentSearches.filter(item => item !== search);
    setRecentSearches(updatedSearches);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>
            <span>{search}</span>
            <button onClick={() => handleDeleteSearch(search)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
