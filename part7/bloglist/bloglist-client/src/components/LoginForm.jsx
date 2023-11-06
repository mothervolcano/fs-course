import { useDispatch, useSelector } from "react-redux";
// import { Table, Form, Button } from "react-bootstrap";
import { setUser } from "../reducers/user";
import { useField } from "../hooks/useField";
import Togglable from "./Togglable";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { Grid, Box, Button, InputLabel, Input } from "@mui/material";

const LoginForm = (props) => {
  const {} = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(
      "logging in with",
      event.target.username.value,
      event.target.password.value,
    );

    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      });

      console.log("@handleLogin: ", user.token);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(setUser(user));
      event.target.username.value = "";
      event.target.password.value = "";

      console.log("logged user: ", user);
    } catch (exception) {
      setTimeout(() => {
        dispatch(clearNotifications());
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logging out", user.name);

    try {
      window.localStorage.clear();
      blogService.setToken(null);

      dispatch(setUser(null));
    } catch (exception) {
      setTimeout(() => {
        dispatch(clearNotifications());
      }, 5000);
    }
  };

  const usernameField = useField("username", "Username", "text");
  const passwordField = useField("password", "Password", "password");

  const form = () => (
    <Togglable buttonLabel="Log in">
      <form onSubmit={handleLogin}>
        <Grid container direction="row" alignItems="center" sx={{ mt: 2, p: 2, border: "1px solid grey"}}>
          <Box sx={{ mr: 3}}>
            <InputLabel>username</InputLabel>
            <input {...usernameField} />
          </Box>
          <Box sx={{ mr: 3}}>
            <InputLabel>password</InputLabel>
            <Input {...passwordField} />
          </Box>
          <Button
            id="login-button"
            type="submit"
            variant="contained"
            size="small"
          >
            login
          </Button>
        </Grid>
      </form>
    </Togglable>
  );

  return (
    <>
      {user === null && form()}
      {user !== null && (
        <div>
          <p>
            {user.name} logged <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
    </>
  );
};

export default LoginForm;
