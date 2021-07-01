import logo from "../logo.svg"
import "../styles/LandingPage.css"

export default function LandingPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h2>Grading System Management</h2>

        <p className="App-desc">
          A full stack web application for digital management of students'
          grades and subjects in different classes in a school, along with
          additional management functionalities of admins and teachers.
        </p>
      </header>
    </div>
  )
}
