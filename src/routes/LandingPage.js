import logo from "../assets/icons/logo.svg"
import { Form, Input, Button, notification, Select } from "antd"
import styles from "../styles/LandingPage.module.css"
import { useContext } from "react"
import { AuthContext } from "../contexts"

export default function LandingPage() {
  const { login, isRequesting } = useContext(AuthContext)
  const [form] = Form.useForm()

  // When user clicks "login"
  const onFinish = async (values) => {
    const { username, password, role } = values

    const { user, error } = await login(role, username, password)
    const label = error ? "error" : "success"
    const message = error ? "Login failed" : "Login successful"
    const description = error ? error.message : `Welcome ${user.forename}`

    notification[label]({
      message,
      description,
    })
  }

  return (
    <div className={styles.LandingPage}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h2>Grading Management System</h2>

        <p className={styles.description}>
          A full stack web application for digital management of student's
          grades and subjects in different classes in a school, along with
          additional management functionalities of admins and teachers.
        </p>

        {/* Login Form */}
        <Form
          form={form}
          name="login_form"
          layout="inline"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please select a role",
              },
            ]}
          >
            <Select
              className={styles.formField}
              placeholder="Select a role"
              onChange={() => {}}
              allowClear
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="pupil">Pupil</Select.Option>
            </Select>
          </Form.Item>

          {/* Username Input */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          {/* Password input */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          {/* Submit button */}
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={isRequesting}
                disabled={
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </header>
    </div>
  )
}
