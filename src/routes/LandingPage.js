import logo from "../assets/icons/logo.svg"
import { Form, Input, Button, notification } from "antd"
import styles from "../styles/LandingPage.module.css"
import { useContext } from "react"
import { AuthContext } from "../contexts"

export default function LandingPage() {
  const { login } = useContext(AuthContext)
  const [form] = Form.useForm()

  const showLoginError = (message) => {
    notification["error"]({
      message: "Login Failed",
      description: message,
    })
  }

  // When user clicks "login"
  const onFinish = async (values) => {
    const { username, password } = values

    try {
      await login(username, password)
    } catch (err) {
      showLoginError(err.message)
    }
  }

  return (
    <div className={styles.LandingPage}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h2>Grading System Management</h2>

        <p className={styles.description}>
          A full stack web application for digital management of students'
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
