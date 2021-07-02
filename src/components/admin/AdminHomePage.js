import { Route, Switch } from "react-router-dom"
import AdminOverview from "./AdminOverview"
import ClassOverview from "./ClassOverview"

export default function AdminHomePage() {
  return (
    <Switch>
      <Route path="/classes/:className">
        <ClassOverview />
      </Route>
      <Route>
        <AdminOverview />
      </Route>
    </Switch>
  )
}
