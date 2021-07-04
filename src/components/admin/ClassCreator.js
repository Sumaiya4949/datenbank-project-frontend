import { useCallback, useContext, useState } from "react"
import { Button, Modal, Form, Input, notification } from "antd"
import { AppstoreAddOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { MUTATION_CREATE_CLASS } from "../../mutations"
import { AuthContext } from "../../contexts"
import { QUERY_ALL_CLASSES } from "../../queries"

export default function ClassCreator() {
  const { loggedInUser } = useContext(AuthContext)

  const [createClass] = useMutation(MUTATION_CREATE_CLASS)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const { name } = await form.validateFields()

      await createClass({
        variables: {
          adminId: loggedInUser.id,
          class: name,
        },
        refetchQueries: [{ query: QUERY_ALL_CLASSES }],
      })

      form.resetFields()
      setModalOpen(false)
      notification["success"]({
        message: "Successfully created class",
      })
    } catch (err) {
      notification["error"]({
        message: err.message,
      })
    }
  }, [form, createClass, loggedInUser.id])

  return (
    <>
      <Button
        size="large"
        shape="round"
        className="admin-action-btn"
        onClick={() => setModalOpen(true)}
      >
        <AppstoreAddOutlined /> Create Class
      </Button>

      <Modal
        visible={isModalOpen}
        title={`Create a new Class`}
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            label="Class name"
            name="name"
            rules={[
              {
                required: true,
                message: "Must have at least 4 characters",
                validator: (_, value) =>
                  value?.length > 4 ? Promise.resolve() : Promise.reject(),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
