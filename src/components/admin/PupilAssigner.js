import { useCallback, useContext, useState } from "react"
import { Button, Modal, Form, Select, notification } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"
import { useMutation, useReactiveVar } from "@apollo/client"
import { MUTATION_ASSIGN_PUPIL } from "../../mutations"
import { AuthContext } from "../../contexts"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"
import { allClassesVar } from "../../global-states"

export default function PupilAssigner(props) {
  const { pupil, pupilClass } = props

  const { loggedInUser } = useContext(AuthContext)

  const allClasses = useReactiveVar(allClassesVar)

  const [assignPupil] = useMutation(MUTATION_ASSIGN_PUPIL)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const { className } = await form.validateFields()

      await assignPupil({
        variables: {
          adminId: loggedInUser.id,
          pupilId: pupil.id,
          class: className,
        },
        refetchQueries: [{ query: QUERY_ADMIN_ALL_USERS }],
      })

      form.resetFields()
      setModalOpen(false)
      notification["success"]({
        message: "Successfully assigned pupil to class",
      })
    } catch (err) {
      notification["error"]({
        message: err.message,
      })
    }
  }, [form, assignPupil, loggedInUser.id, pupil.id])

  return (
    <>
      <Button
        type="text"
        className="admin-action-btn"
        style={{ color: pupilClass ? "blue" : "green" }}
        onClick={() => setModalOpen(true)}
      >
        <PaperClipOutlined /> {pupilClass ? "Reassign Class" : "Assign Class"}
      </Button>

      <Modal
        visible={isModalOpen}
        title={`${pupilClass ? "Reassign" : "Assign new"} class to pupil @${
          pupil.username
        }`}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            label="Class name"
            name="className"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a class" onChange={() => {}} allowClear>
              {allClasses
                .filter((cn) => cn !== pupilClass)
                .map((cn) => (
                  <Select.Option key={cn} value={cn}>
                    {cn}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
