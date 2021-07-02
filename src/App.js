import LandingPage from "./routes/LandingPage"
import useAuth from "./hooks/useAuth"
import { AuthContext } from "./contexts"
import { Route, Switch } from "react-router-dom"
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
        <LandingPage />
      </AuthContext.Provider>
    )

  const { role } = loggedInUser

  return (
    <AuthContext.Provider value={auth}>
      <Layout className="app-layout">
        <Header className="app-header">
          <b className="app-title">Grading System Management</b>

          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}

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
