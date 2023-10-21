import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate( { content, votes: 0 }, {
      onSuccess: () => {
        dispatchNotification({ type: 'INFO', message: `Added: ${content}`, duration: 3000}) 
      },

      onError: () => {
        dispatchNotification({ type: 'ERROR', message: `Anecdote must be at least 5 characters long`, duration: 5000})  
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
