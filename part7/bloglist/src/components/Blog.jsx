import { useState } from "react";

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

const Blog = (props) => {
  const { blog, onLike, onDelete } = props;

  const [likes, setLikes] = useState(blog.likes);
  const [visible, setVisible] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("view");

  const showWhenVisibleStyle = { display: visible ? "" : "none" };

  const toggleVisibility = (event) => {
    event.preventDefault();

    const label = visible ? "view" : "hide";

    setVisible(!visible);
    setButtonLabel(label);
  };

  const addLike = (event) => {
    event.preventDefault();

    const calculateLikes = (likesNum) => likesNum + 1;

    const updatedLikes = calculateLikes(likes);

    setLikes(updatedLikes);
    onLike({ ...blog, likes: updatedLikes });
  };

  const deleteBlog = (event) => {
    event.preventDefault();

    onDelete(blog);
  };

  return (
    <div style={containerStyle} className="blogEntry">
      <div style={entryStyle}>
        <div style={titleStyle}>{blog.title}</div>
        <div style={byStyle}>by</div>
        <div style={authorStyle}>{blog.author}</div>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisibleStyle} className="expandedBlog">
        <div>{blog.url}</div>
        <div id="likeCounter">
          {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>

      {onDelete && <button onClick={deleteBlog}>delete</button>}
    </div>
  );
};

export default Blog;
