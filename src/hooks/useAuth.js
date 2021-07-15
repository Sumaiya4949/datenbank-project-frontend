import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { getPasswordHash } from "../utils"

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

    const hash = getPasswordHash(password)

    try {
      const response = await axios.post(`/auth/login`, {
        username,
        password: hash,
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
      await axios.post(`/auth/logout`)

      setLoggedInUser(null)
      localStorage.removeItem("user")
      setRequesting(false)
      return { success: true }
    } catch (error) {
      setRequesting(false)
      return { error }
    }
  }, [])

  const editInfo = useCallback((info) => {
    setLoggedInUser((prev) => ({ ...prev, ...info }))
  }, [])

  return {
    loggedInUser,
    isRequesting,
    login: loggedInUser ? null : login,
    logout: loggedInUser ? logout : null,
    editLoggedInUserInfo: loggedInUser ? editInfo : null,
  }
}
