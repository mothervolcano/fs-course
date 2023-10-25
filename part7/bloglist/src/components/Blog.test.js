import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  let addLike;
  let user;

  beforeEach(() => {
    user = userEvent.setup();

    const blog = {
      title: "The Future of Procedural Generation in Gaming",
      author: "Alice Nakamoto",
      url: "https://aliceNakamotoBlog.com/future-of-procedural-generation",
      likes: 243,
      user: { name: "edo" },
    };

    addLike = jest.fn();

    container = render(<Blog blog={blog} onLike={addLike} />).container;
  });

  test("displays only title and author at first", () => {
    const titleElement = screen.getByText(
      "The Future of Procedural Generation in Gaming",
    );
    const authorElement = screen.getByText("Alice Nakamoto");

    const div = container.querySelector(".expandedBlog");

    // screen.debug()

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(div).toHaveStyle("display: none");
  });

  test("displays url and likes when view button is clicked", async () => {
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".expandedBlog");

    expect(div).not.toHaveStyle("display: none");
  });

  test("like button is clicked once", async () => {
    const button = screen.getByText("like");
    await user.click(button);

    expect(addLike.mock.calls).toHaveLength(1);
  });

  test("like button is clicked twice", async () => {
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(addLike.mock.calls).toHaveLength(2);
  });
});
