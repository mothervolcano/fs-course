import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useMatch,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification, clearNotifications } from "./reducers/notifications";
import { initBlogs, createBlog } from "./reducers/blogs";
import { initUsers } from "./reducers/users";
import { setUser } from "./reducers/user";
import Notification from "./components/notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogListView from "./components/BlogListView";
import BlogView from "./components/BlogView";
import UserListView from "./components/UserListView";
import UserView from "./components/UserView";
import blogService from "./services/blogs";
import { setSelectedBlog } from "./reducers/selectedBlog";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        home
      </Link>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogEntries = useSelector((state) => state.blogs);
  // const selectedUser = useSelector((state) => state.selectedUser);
  // const selectedBlog = useSelector((state) => state.selectedBlog);

  // -------------------------------------------------
  // HOOKS

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem("loggedUser");

    if (loggedUserData) {
      const user = JSON.parse(loggedUserData);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initBlogs());
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(initUsers());
    }
  }, [user]);

  // -------------------------------------------------
  // HANDLERS

  const addBlog = async (newBlog) => {
    console.log("add new blog: ", newBlog);

    try {
      blogFormRef.current.toggleVisibility();

      console.log("@app.addBlog: ", newBlog.user);

      dispatch(createBlog(newBlog));

      dispatch(
        setNotification(`Added ${newBlog.title} to ${user.name}'s blog list`),
      );
      setTimeout(() => {
        dispatch(clearNotifications());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification(`Failed to add blog. Error: ${exception}`));
      setTimeout(() => {
        dispatch(clearNotifications());
      }, 5000);
    }
  };

  const match = useMatch("/blogs/:id");
  const blog = match
    ? blogEntries.find((b) => b.id === match.params.id)
    : null;

  const matchUser = useMatch("/users/:id");
  const selectedUser = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null;

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="add blog" ref={blogFormRef}>
      <BlogForm onSubmit={addBlog} />
    </Togglable>
  );

  return (
    <div className="container">
      <LoginForm />

      <Menu />

      <Notification
        message={{
          type: "INFO",
          content: useSelector((state) => {
            console.log("Received notification: ", state.notifications);

            return state.notifications;
          }),
        }}
      />

      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route
          path="/blogs"
          element={
            <>
              <h2>Blogs</h2>
              <BlogListView entries={blogEntries} />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <h2>Users</h2>
              <UserListView />
            </>
          }
        />
        <Route path="/blogs/:id" element={<BlogView blog={blog}/>} />
        <Route path="/users/:id" element={<UserView user={selectedUser} />} />
      </Routes>

      {user !== null && <div>{blogForm()}</div>}
    </div>
  );
};

export default App;
