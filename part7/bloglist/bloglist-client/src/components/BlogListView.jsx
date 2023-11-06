import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBlog } from "../reducers/selectedBlog";

const BlogListView = (props) => {
	
	const { entries } = props

	return (
		<>
			{entries.map((blog) => {

				return <div key={blog.id}><Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link></div>

			})}
		</>
	);
};

export default BlogListView;
