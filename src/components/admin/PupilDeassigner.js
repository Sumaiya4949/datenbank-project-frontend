import { useCallback, useContext } from "react"
import { Button, Modal, Form, notification } from "antd"
import {
  ExclamationCircleOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { MUTATION_DEASSIGN_PUPIL } from "../../mutations"
import { AuthContext } from "../../contexts"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"

export default function PupilDeassigner(props) {
  const { pupil } = props

  const { loggedInUser } = useContext(AuthContext)

  const [deassignPupil] = useMutation(MUTATION_DEASSIGN_PUPIL)

  const [form] = Form.useForm()

  const deassignPupilOnConfirm = useCallback(async () => {
    Modal.confirm({
      title: `Do you want to deassign ${pupil.forename} ${pupil.surname}?`,
      icon: <ExclamationCircleOutlined />,
      content: "All the tests of this pupil will get archived",

      async onOk() {
        try {
          await deassignPupil({
            variables: {
              adminId: loggedInUser.id,
              pupilId: pupil.id,
            },
            refetchQueries: [{ query: QUERY_ADMIN_ALL_USERS }],
          })

          form.resetFields()

          notification["success"]({
            message: "Successfully deassigned pupil",
          })
        } catch (err) {
          notification["error"]({
            message: err.message,
          })
        }
      },
    })
  }, [
    pupil.forename,
    pupil.surname,
    pupil.id,
    deassignPupil,
    loggedInUser.id,
    form,
  ])

  return (
    <Button
      type="text"
      className="admin-action-btn"
      onClick={deassignPupilOnConfirm}
      danger
    >
      <UserDeleteOutlined /> Deassign
    </Button>
  )
}
