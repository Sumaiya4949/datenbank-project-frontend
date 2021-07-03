import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import SubjectOverview from "./SubjectOverview"
import { AuthContext } from "../../contexts"

export default function TeacherHomePage() {
  const { loggedInUser } = useContext(AuthContext)

  return (
    <Switch>
      <Route exact path="/subjects/:id">
        <SubjectOverview teacherId={loggedInUser.id} />
      </Route>
    </Switch>
  )
}
