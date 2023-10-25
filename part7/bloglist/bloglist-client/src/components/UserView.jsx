import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogListView from "./BlogListView";

const UserView = (props) => {
	
	const { user } = props

	// const user = useSelector((state) => state.selectedUser);
	const userBlogs = user.blogs;

	console.log("@UserView ", userBlogs);

	return (
		<div>
			<h2>{user.name}</h2>
			<div>
				<BlogListView entries={userBlogs}/>
			</div>
		</div>
	);
};

export default UserView;
