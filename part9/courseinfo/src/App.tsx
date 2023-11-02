import courseData from "../data/courseData";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

function App() {

  return (
    <>
      <Header name={courseData.name} />
      <Content parts={courseData.parts} />
      <Total parts={courseData.parts} />
    </>
  );
}

export default App;
