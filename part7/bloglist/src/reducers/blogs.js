import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},

		appendBlog(state, action) {
			state.push(action.payload);
		},

		upsertBlog(state, action) {
			
			return state.map( (b) => {
				if (b.id === action.payload.id) {
					return action.payload;
				} else {
					return b;
				}
			})
		},

		refreshBlogs(state, action) {

			return state
		},
	},
});

export const { setBlogs, appendBlog, upsertBlog, refreshBlogs } = blogsSlice.actions;

export const initBlogs = () => {
	return async (dispatch) => {
		const entries = await blogService.getAll();

		dispatch(setBlogs(entries));
	};
};

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		const savedBlog = await blogService.create(newBlog);

		dispatch(appendBlog(savedBlog));
	};
};

export const updateBlog = (editedBlog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(editedBlog);

		dispatch(upsertBlog(updatedBlog));
	};
};

export const addComment = (id, commentData) => {
	return async (dispatch) => {

		const updatedBlog = await blogService.addComment(id, commentData)

		dispatch(upsertBlog(updatedBlog))
	}
}

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.deleteEntry(id);
	};
};

export default blogsSlice.reducer;
