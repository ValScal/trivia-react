import styles from "./index.module.css";

export default function ErrorAlert({ children }) {
  return <div className={styles.error_alert}>{children}</div>;
}
