import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' , number: '39-44-5323523' },{ name: 'Ada Lovelace', number: '39-44-5323523' }, { name: 'Dan Abramov', number: '12-43-234345' }, { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


    const addName = (event) => {
      event.preventDefault()
      if (persons.filter( person => person.name === newName ).length > 0){
        alert(`${newName} is already added to phonebook.`);
        return
      }
      setPersons( persons.concat( {name: newName, number: newNumber} ))
      setNewName("")
      setNewNumber("")
    }

    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => {
      setFilterName(event.target.value)
    }
    const personsShow = persons.filter( person => person.name.toLowerCase().startsWith(filter.toLowerCase()) )



  return (
      <div>
        <h2>Phonebook</h2>
        <div>
        filter shown with<input value={filterName} onChange={handleFilterChange}/>
        </div>
        <h3>add a new</h3>
        <form>
          <div>
            name: <input value={newName} onChange={handleNewNameChange}/>
          </div>
          <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit" onClick={addName}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
          {personsShow.map(person => <div  key={person.name} >{person.name} {person.number}</div>)}

      </div>
  )
}

export default App 