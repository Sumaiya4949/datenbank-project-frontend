import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useAuth() {
  const userLocal = localStorage.getItem("user")

  const [isRequesting, setRequesting] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(
    userLocal ? JSON.parse(userLocal) : null
  )

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const response = await axios.get(`/auth/me`, { withCredentials: true })
        setLoggedInUser({ ...response.data })
        localStorage.setItem("user", JSON.stringify(response.data))
      } catch {
        setLoggedInUser(null)
        localStorage.removeItem("user")
      }
    }
    fetchLoggedInUser()
  }, [])

  const login = useCallback(async function (role, username, password) {
    setRequesting(true)
    try {
      const response = await axios.post(`/auth/login`, {
        username,
        password,
        role,
      })

      const user = { ...response.data, role }
      setLoggedInUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      setRequesting(false)

      return { user }
    } catch (error) {
      setRequesting(false)
      return { error }
    }
  }, [])

  const logout = useCallback(async function () {
    try {
      await axios.post(`/auth/logout`, { withCredentials: true })

      setLoggedInUser(null)
      localStorage.remove("user")
      setRequesting(false)
    } catch (error) {
      setRequesting(false)
      throw error
    }
  }, [])

  return {
    loggedInUser,
    isRequesting,
    login: loggedInUser ? login : null,
    logout: loggedInUser ? null : logout,
  }
}
