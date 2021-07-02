import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import { AuthContext } from "../../contexts"
import GradeSheet from "./GradeSheet"

export default function PupilHomePage() {
  const { loggedInUser } = useContext(AuthContext)

  return (
    <>
      <Switch>
        <Route exact path="/gradesheet">
          <GradeSheet pupilId={loggedInUser.id} />
        </Route>
      </Switch>
    </>
  )
}
