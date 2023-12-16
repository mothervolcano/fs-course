import './index.css'

import { useState, useEffect } from 'react';

import directoryService from './services/directory';


// --------------------------------
// COMPONENTS


const PersonEntry = ( props ) => {

  const { data, onDelete } = props;

  const handleDeleteButtonClick = (event) => {

    // onDelete(Number.parseInt(event.target.value));

    console.log('DELETING: ', event.target.value);
    onDelete(event.target.value);
  }

  return (

    <li>

      {data.name}: {data.number}
      <button value={data.id} onClick={handleDeleteButtonClick}>delete</button>

    </li> 
  )
}


const PersonForm = ( props ) => {
  
  const { submitHandler } = props;

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleFormInput= (event) => {

    event.preventDefault();

    submitHandler( { name: newName, number: newNumber } );
  }

  return (

    <form onSubmit={handleFormInput}>
      <div>
        name: <input value={newName} onChange={ (e) => setNewName(e.target.value) }/>
      </div>
      <div>number: <input value={newNumber} onChange={ (e) => setNewNumber(e.target.value) } />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

};

const Notification = (props) => {

  const { message } = props;

  if ( message === null ) {

    return null
  }

  if ( message.type === 'ERROR' ) {

    return (

      <div className='error'>
        {message.content}
      </div>
    )
  }

  return (

    <div className='info'>
      {message.content}
    </div>
  )
}


// ----------------------------------


const Filter = (props) => {

  const { inputHandler } = props;
  
  const [filterSearchTerm, setFilterSearchTerm] = useState('')


  const handleInput = (event) => {

    const inputValue = event.target.value;
    setFilterSearchTerm( inputValue );
    inputHandler( inputValue );
  }

  return (

    <div>
      By name: <input value={filterSearchTerm} onChange={handleInput}/>
    </div>
  )
}


// ----------------------------------


const DisplayList = ( props ) => {

  const { list, onDeleteEntry } = props;

  return (

    <ul>
      
      {list.map( entry => <PersonEntry key={entry.name} data={entry} onDelete={onDeleteEntry} /> )}
    
    </ul>)
}


const App = () => {

  // --------------------------------
  // STATES

  const [persons, setPersons] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);


  // --------------------------------
  // HOOKS

  useEffect( () => {

    directoryService.getAll()
    .then( storedEntries => {

      setPersons(storedEntries);
      setDisplayList(storedEntries);

    })

  }, []);


  // --------------------------------
  // EVENT HANDLERS

  const addPerson = (newEntry) => {

    const entry = persons.find((n) => n.name === newEntry.name )

    if ( entry ) {

      if ( window.confirm(`${newEntry.name} is already in the Phonebook, replace the old number with the new one?`) ) {

        directoryService.updatePerson(entry.id, newEntry)
        .then( updatedEntry => {

          const updatedPersons = persons.map( n => {

            return n.id === entry.id ? { ...entry, number: newEntry.number } : n;

          });

          setPersons(updatedPersons);
          setDisplayList(updatedPersons);

        })
        .catch( error => {

          const updatedPersons = persons.filter( n => n.id !== entry.id );

          setPersons(updatedPersons);
          setDisplayList(updatedPersons);
          
          setNotificationMessage({ type: 'ERROR', content: `The entry for ${newEntry.name} has already been deleted from the directory`} );

        });

      }

    } else {

      directoryService.addPerson(newEntry)
      .then( newEntry => {

          const updatedPersons = persons.concat( newEntry );

          setPersons(updatedPersons);
          setDisplayList(updatedPersons);

          setNotificationMessage( { type: 'INFO', content: `${newEntry.name} added to the Phonebook` } );

          setTimeout( () => {

            setNotificationMessage(null);

          }, 2000 );

      })
      .catch( error => {

        console.log(error.response.data.error);

        setNotificationMessage( { type: 'ERROR', content: `${error.response.data.error}` } );

        setTimeout( () => {

            setNotificationMessage(null);

          }, 2000 );

      });
    }
  }


  const handleFilterInput = ( searchTerm ) => {

    const filteredPersons = persons.filter((entry) => entry.name.includes(searchTerm) );

    if ( searchTerm ) {

      setDisplayList( filteredPersons );

    } else {

      setDisplayList( persons );
    }
  }


  const handleDeleteEntry = (id) => {

    if ( window.confirm(`Delete ${persons.find((n)=>n.id===id).name}?`) ) {

      directoryService.deletePerson(id)
      .then( deletedEntry => {

        console.log('Deleted: ', deletedEntry);

        const updatedPersons = persons.filter( (entry) => { 

          return entry.id !== id;

        });

        setPersons(updatedPersons);
        setDisplayList(updatedPersons);

      });
    }
  }


  return (

    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <h3>Filter</h3>
      <Filter inputHandler={handleFilterInput}/>
      <h3>Add new</h3>
      <PersonForm submitHandler={addPerson} />
      <h2>Numbers</h2>
      <DisplayList list={displayList} onDeleteEntry={handleDeleteEntry} />
    </div>

  )
}

export default App

