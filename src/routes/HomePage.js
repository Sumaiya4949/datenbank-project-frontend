import { useContext } from "react"
import PupilHomePage from "../components/pupil/PupilHomePage"
import AdminHomePage from "../components/admin/AdminHomePage"
import { AuthContext } from "../contexts"
import TeacherHomePage from "../components/teacher/TeacherHomePage"

export default function HomePage() {
  const { loggedInUser } = useContext(AuthContext)

  const { role } = loggedInUser

  return (
    <div>
      {role === "pupil" ? (
        <PupilHomePage />
      ) : role === "admin" ? (
        <AdminHomePage />
      ) : role === "teacher" ? (
        <TeacherHomePage />
      ) : (
        false
      )}
    </div>
  )
}
