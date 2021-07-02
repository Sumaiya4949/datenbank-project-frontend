import axios from "axios"
import { useCallback, useState } from "react"
import { API_SERVER } from "../constants"

export default function useAuth() {
  const [isRequesting, setRequesting] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const login = useCallback(async (role, username, password) => {
    setRequesting(true)

    try {
      const response = await axios.post(`${API_SERVER}/auth/login`, {
        username,
        password,
        role,
      })

      setLoggedInUser({ ...response.data, role })

      setRequesting(false)
    } catch (error) {
      setRequesting(false)
      throw error
    }
  }, [])

  return { loggedInUser, isRequesting, login }
}
