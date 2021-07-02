import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useAuth() {
  const userLocal = localStorage.getItem("user")

  const [isRequesting, setRequesting] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(
    userLocal ? JSON.parse(userLocal) : null
  )

  useEffect(() => {
    axios
      .get(`/auth/me`, { withCredentials: true })
      .then((response) => {
        setLoggedInUser({ ...response.data })
        localStorage.setItem("user", JSON.stringify(response.data))
      })
      .catch((err) => {
        setLoggedInUser(null)
        localStorage.removeItem("user")
      })
  }, [])

  const login = useCallback(async (role, username, password) => {
    setRequesting(true)

    try {
      const response = await axios.post(`/auth/login`, {
        username,
        password,
        role,
      })

      setLoggedInUser({ ...response.data, role })

      localStorage.setItem("user", JSON.stringify({ ...response.data, role }))

      setRequesting(false)
    } catch (error) {
      setRequesting(false)
      throw error
    }
  }, [])

  return { loggedInUser, isRequesting, login }
}
