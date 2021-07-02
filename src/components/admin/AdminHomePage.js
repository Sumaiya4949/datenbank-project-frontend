import { Route, Switch } from "react-router-dom"
import AdminOverview from "./AdminOverview"

export default function AdminHomePage() {
  return (
    <Switch>
      <Route>
        <AdminOverview />
      </Route>
    </Switch>
  )
}
