import React from 'react';
import './index.css';

const SearchBar = ({ value, onChange, onEnter }) => {
    return (
        <input
            id="searchBar"
            placeholder="Search..."
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onEnter}
        />
    );
};

export default SearchBar;