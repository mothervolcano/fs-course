import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS_AND_GENRES } from "./queries";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  const uniqByGenre = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    const allGenres = data?.allGenres || [];
    const allBooks = data?.allBooks || [];

    return {
      allGenres: uniqByGenre(allGenres),
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("books");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("Subscription: BOOK_ADDED: ", data);

      const addedBook = data.data.bookAdded;

      updateCache(
        client.cache,
        { query: ALL_BOOKS_AND_GENRES, variables: { genre: "all genres" } },
        addedBook,
      );

      window.alert(`${addedBook.title} added to library`)
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button
              onClick={() => {
                setPage("authors");
                logout();
              }}
            >
              logout
            </button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommendations"} />
      <LoginForm token={token} setToken={setToken} show={page === "login"} />
    </div>
  );
};

export default App;
