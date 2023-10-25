import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: null,
	reducers: {
		setNotification(state, action) {
			console.log("notification", action.payload);

			return action.payload;
		},

		clearNotifications(state, action) {
			return null;
		},
	},
});

export const { setNotification, clearNotifications } =
	notificationSlice.actions;

export default notificationSlice.reducer;
