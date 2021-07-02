// import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
// import { AuthContext } from "../../contexts"
import MyPupils from "./MyPupils"

export default function TeacherHomePage() {
  // const { loggedInUser } = useContext(AuthContext)

  return (
    <Switch>
      <Route exact path="/mypupils">
        <MyPupils />
      </Route>
    </Switch>
  )
}
