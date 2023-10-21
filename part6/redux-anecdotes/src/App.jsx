import { useEffect } from 'react'

import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {

    dispatch( initializeAnecdotes() )

  }, [])
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App