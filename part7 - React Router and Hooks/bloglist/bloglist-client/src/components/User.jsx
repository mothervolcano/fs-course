import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useMatch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser } from '../reducers/selectedUser'

const User = (props) => {
	const { user } = props;

	console.log('@User ', user.id)

	return (
		<div>
			<Link to={`/users/${user.id}`}>{user.name}</Link>
			<div>{user.blogs.length}</div>
		</div>
	);
};

export default User;
