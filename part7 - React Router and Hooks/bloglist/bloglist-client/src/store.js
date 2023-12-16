import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notifications";
import blogsReducer from "./reducers/blogs";
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import selectedUserReducer from './reducers/selectedUser'
import selectedBlogReducer from './reducers/selectedBlog'

const store = configureStore({
	reducer: {
		notifications: notificationReducer,
		blogs: blogsReducer,
		user: userReducer,
		selectedUser: selectedUserReducer,
		selectedBlog: selectedBlogReducer,
		users: usersReducer
	},
});

export default store;
