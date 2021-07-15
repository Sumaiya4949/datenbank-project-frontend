import { useCallback, useContext } from "react"
import { Button, Modal, notification } from "antd"
import {
  ExclamationCircleOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import {
  MUTATION_DELETE_ADMIN,
  MUTATION_DELETE_PUPIL,
  MUTATION_DELETE_TEACHER,
} from "../../mutations"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"
import { AuthContext } from "../../contexts"

export default function UserDeleter(props) {
  const { user, userRole } = props

  const { loggedInUser: admin } = useContext(AuthContext)

  const adminId = admin.id

  const [deleteUser] = useMutation(
    userRole === "pupil"
      ? MUTATION_DELETE_PUPIL
      : userRole === "teacher"
      ? MUTATION_DELETE_TEACHER
      : MUTATION_DELETE_ADMIN
  )

  const deleteUserOnConfirm = useCallback(async () => {
    Modal.confirm({
      title: `Do you want to delete the ${userRole} "${user.forename} ${user.surname}"?`,
      icon: <ExclamationCircleOutlined />,
      content:
        userRole === "pupil"
          ? "All the tests of this pupil will be removed"
          : "",

      async onOk() {
        try {
          const { data } = await deleteUser({
            variables: {
              id: user.id,
              adminId,
            },
            refetchQueries: [
              {
                query: QUERY_ADMIN_ALL_USERS,
              },
            ],
          })

          const { success, message } = data?.response || {}

          notification[success ? "success" : "error"]({
            message: success ? `Successfully deleted the ${userRole}` : message,
          })
        } catch (err) {
          notification["error"]({
            message: err.message,
          })
        }
      },
    })
  }, [user, deleteUser, userRole, adminId])

  if (userRole === "admin") return false

  return (
    <Button type="text" danger onClick={deleteUserOnConfirm}>
      <UserDeleteOutlined />
      Delete User
    </Button>
  )
}
