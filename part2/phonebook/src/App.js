import axios from 'axios'
import Service from "./server"
import React, { useState , useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' , number: '39-44-5323523' },{ name: 'Ada Lovelace', number: '39-44-5323523' }, { name: 'Dan Abramov', number: '12-43-234345' }, { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const data_url = 'http://localhost:3001/persons'

  const addName = (event) => {
    event.preventDefault()
    const data = {name: newName, number: newNumber}
      const duplicates = persons.filter(p => p.name === newName)
      if (
          duplicates.length >= 1 &&
          window.confirm(`${duplicates[0].name} is already added to phonebook, replace the old number with a new one?`)
      ){
          phonebookService.updateEntry(duplicates[0].id, data)
              .then( updatedPerson => setPersons( persons.map( p => p.id === duplicates[0].id ? updatedPerson : p ) ) )
      }else {
          phonebookService.addEntry( data )
              .then( newPerson => setPersons( persons.concat(newPerson) ) )
      }

      phonebookService.addEntry( {name: newName, number: newNumber} )
          .then( newPerson => setPersons( persons.concat(newPerson) ) 
        )
        setNewName("")
        setNewNumber("")
  }

  const removeName = (id) => {
    const person = persons.find( p => p.id === id )
    if ( window.confirm(`Delete ${person.name}?`) )
        phonebookService.deleteEntry(id)
            .then( response => setPersons( persons.filter(p => p.id !== id)) )
  }
        
  useEffect( () =>
  {
    Service.getAll().then(allEntries => setPersons(allEntries))
  }, [])

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }
  const personsShow = persons.filter( person => person.name.toLowerCase().startsWith(filter.toLowerCase()) )



  return (
      <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} changeHandler={handleFilterChange}/>

        <h3>add a new</h3>
        <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} newName={newName} addName={addName} />
        <h2>Numbers</h2>
        <Persons personsShow={personsShow}
        deleteHandler={removeName}/>
      </div>
  )
}

export default App 