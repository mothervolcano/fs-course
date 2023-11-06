import axios from "axios";
import { useState, useEffect } from "react";

import { NewDiaryEntry, DisplayDiaryEntry, NotificationMessage } from "./types";

import Notification from "./components/Notification";
import EntryList from "./components/EntryList";
import AddEntryForm from "./components/AddEntryForm";

const baseUrl = "http://localhost:3000";

function App() {
  const [entries, setEntries] = useState<DisplayDiaryEntry[]>([]);
  const [notification, setNotification] = useState<NotificationMessage | null>(
    null,
  );

  useEffect(() => {
    axios.get(`${baseUrl}/ping`).then((res) => console.log("ping?", res.data));

    axios
      .get<DisplayDiaryEntry[]>(`${baseUrl}/api/diaries`)
      .then((res) => {
        console.log("retrieved data: ", res.data);
        setEntries(res.data);
        console.log("saved data ", entries);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.log(error.response);
        } else {
          console.log(error);
        }
      });
  }, []);

  const onAddEntryHandler = (newEntry: NewDiaryEntry) => {
    console.log("New entry: ", newEntry);

    axios
      .post<NewDiaryEntry>(`${baseUrl}/api/diaries`, newEntry)
      .then((res) => {
        console.log("saved data", res.data);

        const addedEntry = res.data;

        const displayEntry: DisplayDiaryEntry = {
          date: addedEntry.date,
          visibility: addedEntry.visibility,
          weather: addedEntry.weather
        }

        setEntries(entries.concat(displayEntry))
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("ERROR status: ", error.message);
          console.log("ERROR response: ", error.response);
          if (error.response) {
            setNotification({ type: "ERROR", content: error.response.data });
          } else {
            setNotification({ type: "ERROR", content: "Unknown error" });
          }
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <Notification message={notification} />
      <AddEntryForm onAddEntry={onAddEntryHandler} />
      <h2>Diary Entries</h2>
      <EntryList entries={entries} />
    </>
  );
}

export default App;
