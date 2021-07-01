import LandingPage from "./routes/LandingPage"
import useAuth from "./hooks/useAuth"

function App() {
  const loggedInUser = useAuth()

  if (!loggedInUser) return <LandingPage />

  return <>You are logged in</>
}

export default App
