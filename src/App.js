import LandingPage from "./routes/LandingPage"
import useAuth from "./hooks/useAuth"
import { AuthContext } from "./contexts"

function App() {
  const auth = useAuth()

  if (!auth.loggedInUser)
    return (
      <AuthContext.Provider value={auth}>
        <LandingPage />
      </AuthContext.Provider>
    )

  return (
    <AuthContext.Provider value={auth}>
      <LandingPage />
    </AuthContext.Provider>
  )
}

export default App
