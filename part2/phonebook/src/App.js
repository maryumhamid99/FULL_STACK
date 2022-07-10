import axios from 'axios'
import Service from "./server"
import React, { useState , useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./server";

import Notification from "./components/notification";
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' , number: '39-44-5323523' },{ name: 'Ada Lovelace', number: '39-44-5323523' }, { name: 'Dan Abramov', number: '12-43-234345' }, { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const data_url = 'http://localhost:3001/persons'
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [filter, setFilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const data = {name: newName, number: newNumber}
      const duplicates = persons.filter(p => p.name === newName)
      if (
          duplicates.length >= 1 &&
          window.confirm(`${duplicates[0].name} is already added to phonebook, replace?`)
      ){
          phonebookService.updateEntry(duplicates[0].id, data)
          .then( updatedPerson => {
            if (updatedPerson == null){
                setNotification(`Information: ${duplicates[0].name} has been removed already from the server`, true)
                return
            }
            console.log("updating entry.....")
            setPersons( persons.map( p => p.id === duplicates[0].id ? updatedPerson : p ) )
            setNotification(`Updated number of ${updatedPerson.name}`, false)
        })
        }else {
          phonebookService.addEntry( data )
          .then( newPerson => {
            setPersons( persons.concat(newPerson) )
            setNotification(`Added ${newPerson.name}`, false)
        })
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
  
  const setNotification = (message, isError) => {
    // update state for message or error
    if (isError) setError(message)
    else setMessage(message)
    // in 20 seconds, remove the message or error
    setTimeout( () => isError ? setError(null) : setMessage(null), 5000 )
}

  useEffect( () =>
  {
    Service.getAll().then(allEntries => setPersons(allEntries))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }
  const personsShow = persons.filter( person => person.name.toLowerCase().startsWith(filter.toLowerCase()) )



  return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} isError={false} />
            <Notification message={error} isError={true} />
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