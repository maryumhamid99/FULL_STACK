import axios from 'axios'
import React, { useEffect } from 'react'

import { Country } from './Country'

const Result = (props) => {
  const { countries, setCountries, searchName } = props

  const url = `https://restcountries.eu/rest/v2/name/${searchName}`

  useEffect(() => {
    axios.get(url).then(response => {
      setCountries(response.data)
    })
  })

  return (
    <div>
      {
        countries.length === 1 &&
        <Country country={countries[0]} />
      }
      {
        countries.length > 1 && countries.length < 11 &&
        <div>{countries.map(e => <div>{e.name}</div>)}</div>
      }
      {
        countries.length >= 11 &&
        <div>too many matches specify another filter.</div>
      }
    </div>
  )
}
export { Result }