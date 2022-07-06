import axios from 'axios'
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
      if (persons.filter( person => person.name === newName ).length > 0){
        alert(`${newName} is already added to phonebook.`);
        }
      else{

        const newObject = {
          'name': newName,
          'number': newNumber,
          'id': persons.length+1
        }

        axios.post(data_url, newObject )
        .then( response =>{
          setPersons( persons.concat(response.data) ) 
          setNewName('')
          setNewNumber("")
        })
      }
    }


    
            


    useEffect( () =>
    {
      axios.get("http://localhost:3001/persons").then( response => setPersons(response.data) )
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
        <Persons personsShow={personsShow}/>
      </div>
  )
}

export default App 