import { useContext } from "react"
import PupilHomePage from "../components/PupilHomePage"
import { AuthContext } from "../contexts"

export default function HomePage() {
  const { loggedInUser } = useContext(AuthContext)

  return <div>{loggedInUser.role === "pupil" ? <PupilHomePage /> : false}</div>
}
