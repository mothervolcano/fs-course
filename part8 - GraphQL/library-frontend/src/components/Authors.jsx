import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
  const [authorName, setAuthorName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [addYearBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const handleBirthyearSubmit = (e) => {
    e.preventDefault();

    addYearBorn({ variables: { name: authorName, year: birthYear } });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={handleBirthyearSubmit}>
          <div>
            <Select
              options={authors.map((a) => {
                return { value: a.name, label: a.name };
              })}
              onChange={(e) => setAuthorName(e.value)}
            />
          </div>
          <div>
            Birth
            <input
              value={birthYear}
              onChange={({ target }) => setBirthYear(Number(target.value))}
            />
          </div>
          <button type="submit">Update Button</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
