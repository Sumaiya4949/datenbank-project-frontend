import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import SubjectOverview from "./SubjectOverview"
import { AuthContext } from "../../contexts"
import { Typography } from "antd"

export default function TeacherHomePage() {
  const { loggedInUser } = useContext(AuthContext)

  return (
    <Switch>
      <Route exact path="/subjects/:id">
        <SubjectOverview teacherId={loggedInUser.id} />
      </Route>
      <Route>
        <Typography.Text strong>
          Please select a subject from the menu to get overview
        </Typography.Text>
      </Route>
    </Switch>
  )
}
