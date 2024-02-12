import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/score.module.css";

export default function Score({ name, score }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!name) {
      navigateTo("/");
    }
  }, [name, navigateTo]);

  return (
    <div className={styles.result}>
      <p className={styles.title}>Final Score : {score}</p>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </div>
  );
}
