import React from "react";
import { useState, useEffect } from "react";

const QuestionForm = ({ selectedOptions }) => {
  console.log(selectedOptions);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch questions when selectedOptions change after the component mounts
  useEffect(() => {
    try {
      const fetchQuestions = async () => {
        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${selectedOptions.numQuestions}&category=${selectedOptions.category}&difficulty=${selectedOptions.difficulty}&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results);
        setLoading(false);
      };
      fetchQuestions();
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions.");
    }
  }, [selectedOptions]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    // Validate answers if they are not selected
    event.preventDefault();
    if (Object.keys(userAnswers).length !== questions.length) {
      setError("Please answer all questions.");
      return;
    }

    setError(null);
    // Check answers and build result
    let correctCount = 0;
    const results = questions.map((q, index) => {
      // store the user answer for each question index
      const userAnswer = userAnswers[`question-${index}`];
      // check if the user answer is correct
      const isCorrect = userAnswer === q.correct_answer;
      if (isCorrect) correctCount++; // Increment correct count if answer is correct
      return (
        <li key={index}>
          {q.question} <br />
          Your Answer: {userAnswer} <br />
          Correct Answer: {q.correct_answer} <br />
          {isCorrect ? "✅ Correct" : "❌ Incorrect"}
        </li>
      );
    });

    setSuccess(
      <div>
        <h2>Quiz Results</h2>
        <p>
          Hi {selectedOptions.userName},You got {correctCount} out of{" "}
          {questions.length} correct.
        </p>
        <ul style={{ listStyleType: "none" }}>{results}</ul>
      </div>
    );
  };
  return (
    <div>
      <button onClick={() => window.history.back()}>Back</button>
      <h1>Question Form</h1>

      {!success ? (
        <>
          {loading && <p>Loading...</p>}

          <form onSubmit={handleSubmit}>
            <div
              style={{
                background: "#f8f9fa",
                padding: "1em",
                borderRadius: "8px",
                marginBottom: "1em",
                border: "1px solid #ddd",
              }}
            >
              <strong>Instructions:</strong>
              <ul style={{ margin: "0.5em 0 0 1.5em", listStyleType: "none" }}>
                <li>Read each question carefully.</li>
                <li>
                  Select your answer by clicking one of the radio buttons.
                </li>
                <li>
                  All questions are multiple choice. Only one answer can be
                  selected per question.
                </li>
                <li>
                  Click <b>Submit</b> when you have answered all questions.
                </li>
                <li>
                  You will see your results and can start over if you wish.
                </li>
              </ul>
            </div>
            {questions.map((q, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <h3>
                  {idx + 1}. {q.question}
                </h3>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {[...q.incorrect_answers, q.correct_answer].map(
                    (answer, aIdx) => (
                      <li key={aIdx} style={{ marginBottom: "10px" }}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${idx}`}
                            value={answer}
                            onChange={handleChange}
                          />{" "}
                          {answer}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <div>{success}</div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default QuestionForm;
