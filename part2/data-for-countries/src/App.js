import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Result } from './components/Result'
 
function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleShowClick = (country) => setFilter(country.name)

  return (
  <div>
    <Search countries={countries} setCountries={setCountries} />
    <Result filter={filter} setFilter={setFilter} setCountries={setCountries} />

  </div>
);
}

export default App;0