import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage } from '../reducers/notificationReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const createAnecdote = async (event) => {
		console.log('@app.createAnecdote: ', event.target.anecdote.value)
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		dispatch(addAnecdote(content))
		dispatch(displayMessage(`You just added: ${content}`))
	}

	return (

		<div>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div><input name="anecdote" /></div>
				<button>create</button>
			</form>
		</div>
	)
}


export default AnecdoteForm