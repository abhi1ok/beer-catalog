

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import './App.css';

const BeerCard = ({ beer }) => {
  return (
    <div className="card beer-card">
      <img src={beer.image} className="card-img-top" alt={beer.name} />
      <div className="card-body">
        <h5 className="card-title">{beer.name}</h5>
        <p className="card-text">ABV: {beer.abv}%</p>
        <p className="card-text">First Brewed: {beer.first_brewed}</p>
        <p className="card-text">{beer.description}</p>
      </div>
    </div>
  );
};

const BeerList = ({ beers }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {beers.map((beer, index) => (
        <div key={index} className="col">
          <BeerCard beer={beer} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch beer data from API
    axios.get('https://api.sampleapis.com/beers/ale')
      .then(response => setBeers(response.data))
      .catch(error => console.error('Error fetching beer data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="header">Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search for beer..."
        className="form-control search-input"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <BeerList beers={filteredBeers} />
    </div>
  );
};

export default App;
