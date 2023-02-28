import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        console.log('data received');
        setPersons(initialPersons)
      })
  }, [])
  console.log(persons.length, 'persons rendered');

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const isInPersons = persons
      .map(person => person.name.toLowerCase())
      .includes(newPerson.name.toLowerCase())

    if (isInPersons) {
      const person = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())
      if(person.number !== newPerson.number) {
        if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(person.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            })
        }
      } else {
        alert(`${newPerson.name} is already added to phonebook`)
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setStatus('success')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 3000)
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${personToDelete.name}`)) {
      personService.deletePerson(id)
        .catch(error => {
          setStatus('error')
          setMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 3000)
        })
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilterVal = (e) => {
    setFilterVal(e.target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={status} />
      <Filter value={filterVal} onChange={handleFilterVal} />
      <h2>add a new</h2>
      <PersonForm
        nameValue={newName}
        nameFunc={handleNameChange}
        numberVal={newNumber}
        numberFunc={handleNumberChange}
        submitFunc={addPerson} />
      <h2>Numbers</h2>
      <Persons 
        filterVal={filterVal} 
        persons={persons}
        handleDelete={handleDelete} />
    </div>
  )
}

export default App