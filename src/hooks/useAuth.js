import { useCallback, useState } from "react"

export default function useAuth() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  const login = useCallback((username, password) => {
    throw new Error("meow")
  }, [])

  return { loggedInUser, login }
}
