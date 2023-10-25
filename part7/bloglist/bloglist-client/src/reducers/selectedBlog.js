import { createSlice } from "@reduxjs/toolkit";

const selectedBlogSlice = createSlice({
	name: "selectedUser",
	initialState: null,
	reducers: {
		setSelectedBlog(state, action) {
			return action.payload;
		},
	},
});

export const { setSelectedBlog } = selectedBlogSlice.actions;

export default selectedBlogSlice.reducer;
