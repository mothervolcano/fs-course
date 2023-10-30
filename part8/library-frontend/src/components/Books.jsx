import { ALL_BOOKS_AND_GENRES } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

import BookList from './BookList'

const Books = (props) => {

  const [filter, setFilter] = useState("all genres");

  const result = useQuery(ALL_BOOKS_AND_GENRES, { variables: { genre: filter }});

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const allGenres = result.data.allGenres
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <BookList list={books} />
      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
