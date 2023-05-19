import React from "react";
import "./SearchPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  setSearchQuery,
  setCategory,
  setSort,
}) => {
  const [searchInput, setSearchInput] = React.useState("");
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput);
    }
  };
  const handleSearchClick = () => {
    setSearchQuery(searchInput);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  return (
    <div className="search-form">
      <div className="container">
        <h2 className="text">Find your book</h2>
      <div className="search-form-content">
        <input
          type="text"
          placeholder="Search for books"
          onKeyDown={handleSearch}
          onChange={handleInputChange}
          value={searchInput}
        />
        <button onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="search-select">
        <p className="select-text">Categories: </p>
        <select onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="art">Art</option>
          <option value="biography">Biography</option>
          <option value="computers">Computers</option>
          <option value="history">History</option>
          <option value="medical">Medical</option>
          <option value="poetry">Poetry</option>
        </select>
        <p className="select-text">Sorting by: </p>
        <select onChange={handleSortChange}>
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      </div>
    </div>
  );
};
export default SearchBar;
