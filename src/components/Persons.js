const Persons = ({filterVal, persons, handleDelete}) => {
    const personsToShow = filterVal.length === 0
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filterVal))
  
    return (
      <>
        {personsToShow.map((person, i) => {
          return (
            <div key={i}>
              {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>  
            </div>
          )}
          )
        }
      </>
    )
  }

export default Persons  