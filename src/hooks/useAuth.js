import { useCallback, useState } from "react"

export default function useAuth() {
  const [isRequesting, setRequesting] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const login = useCallback((username, password) => {
    setRequesting(true)
    throw new Error("meow")
  }, [])

  return { loggedInUser, isRequesting, login }
}
