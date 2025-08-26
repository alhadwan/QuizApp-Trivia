import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ selectedOptions, setSelectedOptions }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // handleChange function to update selectedOptions state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // validation if the user has not selected an option
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOptions.category || !selectedOptions.difficulty) {
      setError("Please fill in category and difficulty fields");
      return;
    }
    setError(" ");
    navigate("/quiz");
  };

  return (
    <div>
      <h1>Welcome to our Quiz App</h1>
      <p>Test your knowledge with our trivia questions!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numQuestions">Number of Questions:</label>
        <br />
        <input
          id="numQuestions"
          value={selectedOptions.numQuestions}
          name="numQuestions"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="userName">Name:</label>
        <br />
        <input
          id="userName"
          value={selectedOptions.userName}
          name="userName"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="category">Choose a category:</label>
        <br />
        <select
          id="category"
          value={selectedOptions.category}
          name="category"
          onChange={handleChange}
        >
          <option>Choose a category</option>
          <option value="21">Sports</option>
          <option value="18">Computer Science</option>
          <option value="19">Mathematics</option>
          <option value="20">Vehicles</option>
        </select>
        <br />
        <label htmlFor="difficulty">Choose a difficulty level:</label>
        <br />
        <select
          id="difficulty"
          value={selectedOptions.difficulty}
          name="difficulty"
          onChange={handleChange}
        >
          <option>Choose a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <button type="submit">Start Quiz</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;
