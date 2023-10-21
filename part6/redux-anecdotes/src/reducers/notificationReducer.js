import { createSlice } from "@reduxjs/toolkit";

const defaultMessage = { message: 'Hi there!', duration: 5000 }

const notificationSlice = createSlice({

	name: 'notification',
	initialState: defaultMessage,
	reducers: {

		diplayWelcome(state, action) {

			return defaultMessage
		},

		// displayMessage: {

		// 	reducer: (state, action) => {

		// 		return action.payload
		// 	},

		// 	prepare: ( msg, duration ) => {

		// 		return { payload: { msg, duration } }
		// 	}
		// },

		displayMessage(state, action) {

			const { message, duration } = action.payload

			console.log('message: ', action)
			console.log('duration: ', duration)

			return { payload: { message, duration }}
		},

		clearNotifications(state, action) {

			return null
		},
	}
})


export const { displayWelcome, displayMessage, clearNotifications, setNotification } = notificationSlice.actions

export default notificationSlice.reducer