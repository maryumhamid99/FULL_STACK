import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilterName] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    useEffect( () =>{
        personService.getAll()
            .then( allEntries => setPersons(allEntries) )
        }, [])
    console.log("persons");
    console.log(persons);

    const addName = (event) => {
        event.preventDefault()
        const data = {name: newName.trim(), number: newNumber}
        const copy_entry = persons.filter(p => p.name === newName.trim())
        if (
            copy_entry.length>= 1  &&
            window.confirm(`${copy_entry[0].name} is already exists replace the old number with a new one`)
        ){
            personService.updateEntry(copy_entry[0].id, data)
                .then( updatedPerson => {
                    if (updatedPerson == null){
                        setNotification(`Information of ${copy_entry[0].name} removed from server`, true)
                        return
                    }
                    console.log("updating person now..")
                    setPersons( persons.map( p => p.id === copy_entry[0].id ? updatedPerson : p ) )
                    setNotification(`Updated number of ${updatedPerson.name}`, false)
                })
                .catch( error => setNotification(error.response.data.error, true) )

        }else {
            personService.addEntry( data )
                .then( newPerson => {
                    setPersons( persons.concat(newPerson) )
                    setNotification(`Added ${newPerson.name}`, false)
                })
                .catch( error => setNotification(error.response.data.error, true) )
        }

        setNewName("")
        setNewNumber("")
    }

    const removeName = (id) => {
        const person = persons.find( p => p.id === id )
        if ( window.confirm(`Delete ${person.name}?`) )
            personService.deleteEntry(id)
                .then( response => {
                    if (response == null){
                        setNotification(`Information of ${person.name} has already been removed from server`, true)
                        return
                    }
                    setPersons( persons.filter(p => p.id !== id))
                    setNotification(`Removed person ${person.name}`, false)
                })
    }

    const setNotification = (message, error_exixts) => {
        if (error_exixts) setError(message)
        else setMessage(message)
        setTimeout( () => error_exixts ? setError(null) : setMessage(null), 5000 )
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilterName(event.target.value)

    const personsShow = persons.filter(p => p.name.toLowerCase().startsWith(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} error_exixts={false} />
            <Notification message={error} error_exixts={true} />
            <Filter filter={filter} changeHandler={handleFilterChange}/>
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNewNumberChange}
                addName={addName}/>
            <h3>Numbers</h3>
            <Persons personsShow={personsShow} deleteHandler={removeName}/>
        </div>
    )
}

export default App