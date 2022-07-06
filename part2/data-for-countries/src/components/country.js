const Country = (props) => {
    const { country } = props
    return (
      <div>
        <h2>{country.name}</h2>
        <div>
          <div>Capital {country.capital}</div>
          <div>Population {country.population}</div>
        </div>
        <div>
          <h3>Languages:</h3>
          {
            country.languages.map((e, i) => <li key={i}>{e.name}</li>)
          }
        </div>
        <br />
        <div>
          <img src={country.flag} alt="Country Flag" width="6%" />
        </div>
      </div>
    )
  }
  
  export { Country }