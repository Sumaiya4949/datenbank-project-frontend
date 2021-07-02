import LandingPage from "./routes/LandingPage"
import useAuth from "./hooks/useAuth"
import { AuthContext } from "./contexts"
import { Route, Switch, Redirect } from "react-router-dom"
import HomePage from "./routes/HomePage"
import InvalidRoute from "./routes/InvalidRoute"
import { Layout, Button, notification } from "antd"
import { useCallback } from "react"
import AppSideNavPupil from "./components/pupil/AppSideNavPupil"
import RouteBreadcrumbs from "./components/RouteBreadcrumbs"

const { Header, Content } = Layout

function App() {
  const auth = useAuth()

  const { loggedInUser, logout } = auth

  const logOutAndNotify = useCallback(async () => {
    const { error } = await logout()

    const label = error ? "error" : "success"
    const message = error ? "Logout unsuccessful" : "Successfully logged out"
    const description = error ? error.message : ""

    notification[label]({
      message,
      description,
    })
  }, [logout])

  if (!loggedInUser)
    return (
      <AuthContext.Provider value={auth}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </AuthContext.Provider>
    )

  const { role } = loggedInUser

  return (
    <AuthContext.Provider value={auth}>
      <Layout className="app-layout">
        <Header className="app-header">
          <b className="app-title">Grading System Management</b>

          <Button
            className="btn-logout"
            type="danger"
            onClick={logOutAndNotify}
          >
            Log out
          </Button>
        </Header>

        <Layout>
          {role === "pupil" ? <AppSideNavPupil /> : false}

          <Layout style={{ padding: "0 24px 24px" }}>
            <RouteBreadcrumbs />

            <Content className="app-content-container">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route component={InvalidRoute} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
