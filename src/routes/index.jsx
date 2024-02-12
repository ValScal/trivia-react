import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Categories } from "../data/categories.jsx";
import ErrorAlert from "../components/ErrorAlert/index.jsx";
import styles from "../styles/index.module.css";

export default function Home({ name, setName, fetchQuestions }) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!category || !difficulty || !name) {
      setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigateTo("./game");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <h2>Choose your settings!</h2>
        <div className={styles.settings__select}>
          {error && (
            <ErrorAlert>Please fill all the fields to start!</ErrorAlert>
          )}
          <form onSubmit={onHandleSubmit}>
            <label htmlFor="name">Your name:</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              required
            />

            <label htmlFor="category">Pick a category:</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
              required
            >
              {Categories.map((cat) => (
                <option key={cat.category} value={cat.value}>
                  {cat.category}
                </option>
              ))}
            </select>

            <label htmlFor="difficulty">Set difficulty:</label>
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              id="difficulty"
              name="difficulty"
              required
            >
              <option key="Easy" value="easy">
                Easy
              </option>
              <option key="Medium" value="medium">
                Medium
              </option>
              <option key="Hard" value="hard">
                Hard
              </option>
            </select>

            <div className={styles.btn_container}>
              <button
                className={styles.btn}
                type="submit"
                onClick={onHandleSubmit}
              >
                Start!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
