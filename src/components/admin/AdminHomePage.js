import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import { AuthContext } from "../../contexts"
import AdminOverview from "./AdminOverview"
import ClassOverview from "./ClassOverview"
import SubjectsList from "./SubjectsList"

export default function AdminHomePage() {
  const { loggedInUser } = useContext(AuthContext)

  return (
    <Switch>
      <Route path="/classes/:className">
        <ClassOverview adminId={loggedInUser.id} />
      </Route>

      <Route exact path="/subjects">
        <SubjectsList adminId={loggedInUser.id} />
      </Route>

      <Route>
        <AdminOverview />
      </Route>
    </Switch>
  )
}
