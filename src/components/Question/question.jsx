import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./question.module.css";
import ErrorAlert from "../ErrorAlert";

export default function Question({
  currQuestion,
  setCurrQuestion,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) {
  const decodedQuestion = questions[currQuestion]?.question
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');

  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const navigateTo = useNavigate();

  const onHandleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const onHandleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const onHandleNext = () => {
    if (currQuestion >= questions.length - 1) {
      navigateTo("/score");
    } else if (selected) {
      setCurrQuestion(currQuestion + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const onHandleQuit = () => {
    setCurrQuestion(0);
    setQuestions();
  };

  return (
    <div className={styles.question}>
      <h2>Question {currQuestion + 1} :</h2>

      <div className={styles.singleQuestion}>
        <h3>{decodedQuestion}</h3>
        <div className={styles.options}>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          {options &&
            options.map((i) => (
              <button
                className={`${styles.singleOption} ${
                  selected ? styles.selected : ""
                }`}
                key={i}
                onClick={() => onHandleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className={styles.controls}>
          <button className={styles.btn_quit} onClick={onHandleQuit}>
            <Link to="/">Quit</Link>
          </button>
          <button className={styles.btn_next} onClick={onHandleNext}>
            {currQuestion > 10 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
