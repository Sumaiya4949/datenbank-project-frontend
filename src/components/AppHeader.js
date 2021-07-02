import { useContext } from "react"
import { AuthContext } from "../contexts"

export default function AppHeader() {
  const { logout } = useContext(AuthContext)

  return <div>Header</div>
}
