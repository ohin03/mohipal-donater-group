import React from "react";

function SearchBar({ query, setQuery }) {
  return (
    <div className="mb-4 text-center">
      <input
        type="text"
        className="form-control w-75 mx-auto"
        placeholder="🔍 Search donors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;