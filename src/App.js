import LandingPage from "./routes/LandingPage"
import useAuth from "./hooks/useAuth"
import { AuthContext } from "./contexts"

function App() {
  const auth = useAuth()

  console.log(auth)

  if (!auth.loggedInUser)
    return (
      <AuthContext.Provider value={auth}>
        <LandingPage />
      </AuthContext.Provider>
    )

  return (
    <AuthContext.Provider value={auth}>You are logged in</AuthContext.Provider>
  )
}

export default App
