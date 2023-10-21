import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {

	switch (action.type) {

		case "ERROR":
			return { message: action.message, duration: action.duration, type: action.type }
		case "INFO":
			console.log('dipatching info: ', action)
			return { message: action.message, duration: action.duration, type: action.type }
		case "CLEAR":
			return {type: action.type}
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

	const [ notification, notificationDispatch ] = useReducer( notificationReducer, "CLEAR" )

	return (

		<NotificationContext.Provider value = { [notification, notificationDispatch] }>

			{ props.children }

		</NotificationContext.Provider>
	)
}

export const useNotificationState = () => {

	const reducer = useContext(NotificationContext)
	return reducer[0]
}

export const useNotificationDispatch = () => {

	const reducer = useContext(NotificationContext)
	return reducer[1]
}

export default NotificationContext