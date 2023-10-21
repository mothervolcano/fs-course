import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'


const anecdoteSlice = createSlice({

  name: 'anecdotes',
  initialState: [],
  reducers: {

    refreshAnecdotes( state, action ) {

      return action.payload.sort( (a,b) => b.votes - a.votes )
    },

    appendAnecdote(state, action) {

      state.push( action.payload )
    },

    setAnecdotes( state, action ) {

      return action.payload.sort( (a,b) => b.votes - a.votes )
    }
  }
})

export const { refreshAnecdotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {

  return async (dispatch) => {

    const entries = await anecdotes.getAll()
    dispatch( setAnecdotes(entries) )
  }
}

export const addAnecdote = (content) => {

  return async (dispatch) => {

    const newAnecdote = await anecdotes.createNew(content)
    dispatch( appendAnecdote(newAnecdote) )
  }
}

export const addVote = (id) => {

  return async (dispatch) => {

    const entryToUpdate = await anecdotes.getAnecdote(id)
    const updatedEntry = { ...entryToUpdate, votes: entryToUpdate.votes + 1 }
    await anecdotes.updateAnecdote(id, updatedEntry)
    const entries = await anecdotes.getAll()
    dispatch( setAnecdotes(entries) )
  }
}

export default anecdoteSlice.reducer

