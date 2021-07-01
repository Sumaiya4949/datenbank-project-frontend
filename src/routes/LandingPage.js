import logo from "../assets/icons/logo.svg"
import { Button } from "antd"
import styles from "../styles/LandingPage.module.css"

export default function LandingPage() {
  return (
    <div className={styles.LandingPage}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />

        <h2>Grading System Management</h2>

        <p className={styles.description}>
          A full stack web application for digital management of students'
          grades and subjects in different classes in a school, along with
          additional management functionalities of admins and teachers.
        </p>

        <div className={styles.loginPanel}></div>
      </header>
    </div>
  )
}
