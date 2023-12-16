import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { displayMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	
	const anecdotes = useSelector( (state) => {

		if ( state.filter === 'ALL') {

			return state.anecdotes

		} else {

			const filteredAnecdotes = state.anecdotes.filter( (o) => {

				return o.content.includes(state.filter)
			})

			return filteredAnecdotes
		}
	})

	const dispatch = useDispatch()

	const vote = (anecdote) => {
		console.log('vote', anecdote.id)
		dispatch(addVote(anecdote.id))
		dispatch(displayMessage(`You voted for: ${anecdote.content}`, 5))
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)

}

export default AnecdoteList