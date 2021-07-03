import { useCallback, useState } from "react"
import { Button, Modal, Form, Input, Radio } from "antd"
import { UserAddOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { MUTATION_CREATE_USER } from "../../mutations"

export default function UserCreator(props) {
  const [createUser] = useMutation(MUTATION_CREATE_USER)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const { role, forename, surname, username, password } =
        await form.validateFields()

      await createUser({
        variables: { role, forename, surname, username, password },
        refetchQueries: [
          // {
          //   query: QUERY_TEST_DETAILS,
          //   variables: { id: testId, teacherId },
          // },
        ],
      })

      form.resetFields()
      setModalOpen(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [form, createUser])

  return (
    <>
      <Button size="large" type="primary" onClick={() => setModalOpen(true)}>
        <UserAddOutlined /> Add User
      </Button>

      <Modal
        visible={isModalOpen}
        title={`Create an User`}
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            label="User role"
            name="role"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="admin" style={{ color: "crimson" }}>
                Admin
              </Radio.Button>
              <Radio.Button value="teacher" style={{ color: "blue" }}>
                Teacher
              </Radio.Button>
              <Radio.Button value="pupil" style={{ color: "green" }}>
                Pupil
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            className="collection-create-form_last-form-item"
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

          <Form.Item
            name="forename"
            label="Forename"
            className="collection-create-form_last-form-item"
            rules={[
              {
                required: true,
                message: "Must have at least 5 characters",
                validator: (_, value) =>
                  value?.length > 4 ? Promise.resolve() : Promise.reject(),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Surname"
            className="collection-create-form_last-form-item"
            rules={[
              {
                required: true,
                message: "Must have at least 5 characters",
                validator: (_, value) =>
                  value?.length > 4 ? Promise.resolve() : Promise.reject(),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            className="collection-create-form_last-form-item"
            rules={[
              {
                required: true,
                message: "Must have at least 5 characters",
                validator: (_, value) =>
                  value?.length > 4 ? Promise.resolve() : Promise.reject(),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
