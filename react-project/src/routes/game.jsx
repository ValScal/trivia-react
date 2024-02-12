import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Question from "./../components/Question/question";
import styles from "../styles/game.module.css";

// import "./game.css";

export default function Game({
  name,
  questions,
  score,
  setScore,
  setQuestions,
}) {
  const [options, setOptions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(0);

  useEffect(() => {
    if (questions) {
      const shuffledOptions = onHandleShuffle([
        questions[currQuestion]?.correct_answer,
        ...questions[currQuestion]?.incorrect_answers,
      ]);

      setOptions(shuffledOptions);
    }
  }, [currQuestion, questions]);

  console.log(questions);

  const onHandleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className={styles.game}>
      <p className={styles.subtitle}>Welcome, {name}</p>

      {questions ? (
        <>
          <div className={styles.game_info}>
            <span>{questions[currQuestion].category}</span>
            <span>Difficulty : {questions[currQuestion].difficulty}</span>
            <span>Score : {score}</span>
          </div>
          <Question
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            questions={questions}
            options={options}
            correct={questions[currQuestion]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </div>
  );
}
