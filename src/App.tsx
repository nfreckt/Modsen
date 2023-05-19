import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar'
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [key, setKey] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setKey(query + category + sort);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    setKey(searchQuery + category + sort);
  };

  const handleSortChange = (sort: string) => {
    setSort(sort);
    setKey(searchQuery + category + sort);
  };

  return (
    <Router>
      <div className="App">
        <SearchBar
          setSearchQuery={handleSearch}
          setCategory={handleCategoryChange}
          setSort={handleSortChange}
        />
        <Routes>
          <Route
            path="/"
            element={
            <BookList searchQuery={searchQuery} category={category} sort={sort} key={key} />
           }
          />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
