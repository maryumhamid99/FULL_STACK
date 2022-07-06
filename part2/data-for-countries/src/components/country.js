const Button = (props) => {
    const { countryDisp, showFlag, name } = props
  
    const handleChange = () => {
      let change = { ...countryDisp }
      change[name] = !countryDisp[name]
      showFlag(change)
    }
  
    return (
      <button onClick={handleChange}>
        {
          !countryDisp[name] &&
          "show"
        }
        {
          countryDisp[name] &&
          "don't show"
        }
      </button>
    )
  }
  
  const Country = (props) => {
    const { country, countryDisp, showFlag } = props
  
    if (countryDisp[country.name]) {
      return (
        <div>
          <h2>{country.name}</h2>
          <div>
            <div>Capital {country.capital}</div>
            <div>Population {country.population}</div>
          </div>
          <div>
            <h5>Languages</h5>
            {
              country.languages.map(e => <li key={e.name}>{e.name}</li>)
            }
          </div>
          <br />
          <div>
            <img src={country.flag} alt="Country Flag" width="6%" />
          </div>
        </div>
      )
    }
  
    return (
      <div>
        { country.name}
        < Button countryDisp={countryDisp} showFlag={showFlag} name={country.name} />
      </div>
    )
  }
  export { Country }