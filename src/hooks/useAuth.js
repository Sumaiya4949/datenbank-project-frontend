import { useState } from "react"

export default function useAuth() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  return loggedInUser
}
