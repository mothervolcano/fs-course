import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  let container;
  let addBlog;
  let user;

  const blog = {
    title: "The Future of Procedural Generation in Gaming",
    author: "Alice Nakamoto",
    url: "https://aliceNakamotoBlog.com/future-of-procedural-generation",
    likes: 243,
    user: { name: "edo" },
  };

  beforeEach(() => {
    user = userEvent.setup();

    addBlog = jest.fn();

    container = render(<BlogForm onSubmit={addBlog} />).container;
  });

  test("calls onSubmit and sends the correct data", async () => {
    const inputTitle = screen.getByRole("textbox", { name: "Title" });
    const inputAuthor = screen.getByRole("textbox", { name: "Author" });
    const inputUrl = screen.getByRole("textbox", { name: "Url" });
    const sendButton = screen.getByText("save");

    await user.type(inputTitle, blog.title);
    await user.type(inputAuthor, blog.author);
    await user.type(inputUrl, blog.url);
    await user.click(sendButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe(blog.title);
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author);
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url);
  });
});
