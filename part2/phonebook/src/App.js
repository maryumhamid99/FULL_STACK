import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import personsService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/notification";

const App = () => {
  // const [persons, setPersons] = useState([{ name: 'Arto Hellas' , number: '39-44-5323523' },{ name: 'Ada Lovelace', number: '39-44-5323523' }, { name: 'Dan Abramov', number: '12-43-234345' }, { name: 'Mary Poppendieck', number: '39-23-6423122' }])
const [persons, setPersons] = useState('')
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [message, setMessage] = useState(null)
const [error, setError] = useState(null)
const [filter, setFilterName] = useState('')

  useEffect( () =>{
    personsService.getAll()
        .then( response  => setPersons(response.data) )
    }, [])


  const addName = (event) => {
    event.preventDefault()
    const data = {name: newName, number: newNumber}
      const duplicates = persons.filter(p => p.name === newName)
      if (
          duplicates.length >= 1 &&
          window.confirm(`${duplicates[0].name} is already added to phonebook, replace?`)
      ){
          personsService.updateEntry(duplicates[0].id, data)
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
          personsService.addEntry( data )
          .then( newPerson => {
            setPersons( persons.concat(newPerson) )
            setNotification(`Added ${newPerson.name}`, false)
        })
      }

      personsService.addEntry( {name: newName, number: newNumber} )
          .then( newPerson => setPersons( persons.concat(newPerson) ) 
        )
        setNewName("")
        setNewNumber("")
  }

  

  const removeName = (id) => {
    const person = persons.find( p => p.id === id )
    if ( window.confirm(`Delete ${person.name}?`) )
        personsService.deleteEntry(id)
            .then( response => setPersons( persons.filter(p => p.id !== id)) ).catch( error => console.log("Failed to delete", error) )
  }
  
  const setNotification = (message, isError) => {
    if (isError) setError(message)
    else setMessage(message)
    setTimeout( () => isError ? setError(null) : setMessage(null), 2000 )
}

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }
    console.log("persons");
    console.log(persons);


  const personsShow = persons.filter( person1 => person1.name.toLowerCase().startsWith(filter.toLowerCase()) )
  console.log(personsShow);


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