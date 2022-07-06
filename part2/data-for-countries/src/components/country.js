import axios from 'axios'
import { useState, useEffect } from 'react'

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
    
    const api_key = process.env.REACT_APP_API_KEY
    const weather_api = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
        
    const [windSpeed, setWindSpeed] = useState('')
    const [temperature, setTemperature] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')



    useEffect(() => {
        axios.get(weather_api).then(response => {
          setWeatherIcon(response.data['current']['weather_icons'][0])
          setTemperature(response.data['current']['temperature'])
          setWindSpeed(response.data['current']['wind_speed'])
        })
      }, [weather_api])



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
        
          <div>
          <h4>Weather in {country.capital}</h4>
          <div>
            <div>
              <h4>Temperature: </h4>
              <div>
                {temperature} Celcius.
              </div>
              <img src={weatherIcon} alt="Weather Icon" width="3%"  height="3%"/>
            </div>
            <div>
              <h4>Wind: </h4>
              <div>Speed: {windSpeed} mph</div>
            </div>
          </div>
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