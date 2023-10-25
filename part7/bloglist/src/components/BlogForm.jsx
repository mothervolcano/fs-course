import { useState } from "react";

const BlogForm = (props) => {
  const { onSubmit } = props;

  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("@BlogForm.handleFormInputs: ", newBlog);

    onSubmit(newBlog);

    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div className="addBlogForm">
      <h2>Add a new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            id="blogTitle"
            type="text"
            value={newBlog.title}
            name="Title"
            aria-label="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>

        <div>
          <label>Author</label>
          <input
            id="blogAuthor"
            type="text"
            value={newBlog.author}
            name="Author"
            aria-label="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>

        <div>
          <label>Url</label>
          <input
            id="blogUrl"
            type="text"
            value={newBlog.url}
            name="Url"
            aria-label="Url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>

        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
