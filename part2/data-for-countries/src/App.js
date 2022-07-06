import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
 
function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryDisp, showFlag] = useState({})

  const url = `https://restcountries.eu/rest/v2/name/${searchName}`

  useEffect(() => {
    axios.get(url).then(response => {
      setCountries(response.data)
    })
  }, [url])

  useEffect(() => {
    let change = {}
    countries.forEach(e => change[e.name] = false)
    showFlag(change)
  }, [countries])




  return (
  <div>
    <Search countries={countries} setCountries={setCountries} />
    <Filter filter={filter} setFilter={setFilter} setCountries={setCountries}
        searchName={searchName} countryDisp={countryDisp} showFlag={showFlag} />
    </div>
);
}

export default App;0