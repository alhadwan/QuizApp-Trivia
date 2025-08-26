import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import QuestionForm from "./Components/QuestionForm";
import "../src/App.css";

function App() {
  //lift the sate up to the parent and pass the selectedOptions and setSelectedOptions as props to each child component
  const [selectedOptions, setSelectedOptions] = useState({
    userName: "",
    category: "",
    difficulty: "",
    numQuestions: 10,
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        }
      />
      <Route
        path="/quiz"
        element={<QuestionForm selectedOptions={selectedOptions} />}
      />
    </Routes>
  );
}

export default App;
