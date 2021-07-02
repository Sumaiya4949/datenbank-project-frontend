import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import { AuthContext } from "../../contexts"
import GradeSheet from "./GradeSheet"
import SubjectDetails from "./SubjectDetails"

export default function PupilHomePage() {
  const { loggedInUser } = useContext(AuthContext)

  return (
    <>
      <Switch>
        <Route exact path="/gradesheet">
          <GradeSheet pupilId={loggedInUser.id} />
        </Route>
        <Route exact path="/subjects/:id">
          <SubjectDetails pupilId={loggedInUser.id} />
        </Route>
      </Switch>
    </>
  )
}
