import axios from 'axios'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const dispatchNotification = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatchNotification({ type:'INFO', message: `Voted for: ${anecdote.content}`, duration: 5000 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))


  if ( result.isError ) {

    return <div>Anecdote service is not available due to server problems :(</div>

  } else if ( result.isPending ) {

    return <div>retrieving anedoctes...</div>

  } else if ( result.isSuccess ) {

      const anecdotes = result.data

      console.log('retrieved entries: ', anecdotes)

    return (

      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
