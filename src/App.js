import LandingPage from "./routes/LandingPage"
import AppHeader from "./components/AppHeader"
import useAuth from "./hooks/useAuth"
import { AuthContext } from "./contexts"
import { Route, Switch } from "react-router-dom"
import HomePage from "./routes/HomePage"
import InvalidRoute from "./routes/InvalidRoute"

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
    <AuthContext.Provider value={auth}>
      <AppHeader />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={InvalidRoute} />
        </Switch>
      </main>
    </AuthContext.Provider>
  )
}

export default App
