import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useField } from "../hooks/useField";

const LoginForm = (props) => {
	const { setError, token, setToken } = props;

	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");

	const visibilityStyle = { display: token ? "none" : "" };

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			console.log("ERROR @LOGIN ", error.graphQLErrors[0].message);
		},
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem("phonenumber-user-token", token);
		}
	}, [result.data]);

	const submit = async (event) => {
		event.preventDefault();

		login({
			variables: {
				username: event.target.username.value,
				password: event.target.password.value,
			},
		});
	};

	const usernameField = useField("username", "Username", "text");
	const passwordField = useField("password", "Password", "password");

	if (!props.show) {
		return null;
	}

	return (
		<div style={visibilityStyle}>
			<form onSubmit={submit}>
				<div>
					<label>username</label>
					<input {...usernameField} />
				</div>
				<div>
					<label>password</label>
					<input {...passwordField} />
				</div>

				<button type="submit">login</button>
			</form>
		</div>
	);
};

export default LoginForm;
