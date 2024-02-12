import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Home from "./routes/index.jsx";
import Game from "./routes/game.jsx";
import Score from "./routes/score.jsx";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import styles from "./App.module.css";

export default function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const amount = 10;
      const category = Math.floor(Math.random() * (32 - 9 + 1)) + 9;
      const difficulty = ["easy", "medium", "hard"][
        Math.floor(Math.random() * 3)
      ];
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error retrieving questions");
      }

      const data = await response.json();
      setQuestions(data.results); 
      setLoading(false);
      console.log(data.results);
    } catch (error) {
      console.error(
        "An error occurred while retrieving applications:",
        error
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);


  if (loading) {
    // return <p>loading</p>

    return <ColorRing visible={true}
    height="80"
    width="80"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />;
  }

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          />

          <Route path="/score" element={<Score name={name} score={score} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
