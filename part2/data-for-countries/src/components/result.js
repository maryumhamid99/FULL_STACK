import { Country } from './Country'

const Filter = (props) => {
  const { countries, searchName, countryDisp, showFlag } = props

  if (searchName) {
    if (countries.length === 1) {
      return (
        <div>
          <Country country={countries[0]} countryDisp={countryDisp} showFlag={showFlag} />
        </div>
      )
    } else if (countries.length >= 11) {
      return (
        <div> Too many matches, specify another filter</div>
      )
    }else if (countries.length > 1 && countries.length < 11) {
      return (
        <div>
          {
            countries.map(e => {
              return (
                <div key={e.name}>
                  <Country country={e} countryDisp={countryDisp} showFlag={showFlag} />
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  return (<div></div>)
}

export { Filter }