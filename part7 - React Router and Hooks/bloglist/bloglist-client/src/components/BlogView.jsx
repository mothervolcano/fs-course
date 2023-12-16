import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, updateBlog, deleteBlog } from "../reducers/blogs";
import { useField } from "../hooks/useField";

const containerStyle = {
	paddingTop: 10,
	paddingLeft: 2,
	border: "solid",
	borderWidth: 1,
	marginBottom: 5,
};

const entryStyle = {
	display: "flex",
};

const titleStyle = {
	fontWeight: "bold",
};

const authorStyle = {
	fontStyle: "italic",
};

const byStyle = {
	paddingLeft: 5,
	paddingRight: 5,
};

const BlogView = (props) => {
	const { blog } = props;

	console.log("@BlogView ", blog);

	const dispatch = useDispatch();
	// const blog = useSelector((state) => state.selectedBlog);
	const user = useSelector((state) => state.user);

	const [likes, setLikes] = useState(blog.likes);

	const addLike = (event) => {
		event.preventDefault();

		const calculateLikes = (likesNum) => likesNum + 1;

		const updatedLikes = calculateLikes(likes);

		setLikes(updatedLikes);
		console.log("@App.addLike: ", blog.likes);
		dispatch(updateBlog({ ...blog, likes: updatedLikes }));
	};

	const deleteEntry = (event) => {
		event.preventDefault();

		if (window.confirm(`Are you sure you want to delete blog ${blog.title}?`)) {
			dispatch(deleteBlog(blog.id));
		}
	};

	const handleCommentSubmit = (event) => {
		event.preventDefault();

		console.log("Sending comment: ", event.target.comment.value);

		dispatch(addComment(blog.id, { comment: event.target.comment.value }));

		comment.onChange()
	};

	const comment = useField("comment", "Comment", "text");

	return (
		<div style={containerStyle} className="blogEntry">
			<div style={entryStyle}>
				<div style={titleStyle}>{blog.title}</div>
				<div style={byStyle}>by</div>
				<div style={authorStyle}>{blog.author}</div>
			</div>

			<div>
				<div>{blog.url}</div>
				<div id="likeCounter">
					{blog.likes}
					<button onClick={addLike}>like</button>
				</div>
				<div>{blog.user.name}</div>
			</div>
			{user?.username === blog.user.username && (
				<button onClick={deleteEntry}>delete</button>
			)}
			<div>
				<h5>Comments</h5>
				<form onSubmit={handleCommentSubmit}>
					<input {...comment} />
					<button>send</button>
				</form>
				{blog.comments.map((c) => {
					return <div key={c}>{c}</div>;
				})}
			</div>
		</div>
	);
};

export default BlogView;
