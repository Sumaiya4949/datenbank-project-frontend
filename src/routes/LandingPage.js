import logo from "../assets/icons/logo.svg"
import { Form, Input, Button } from "antd"
import styles from "../styles/LandingPage.module.css"
import { useCallback } from "react"

export default function LandingPage() {
  const [form] = Form.useForm()

  // When user clicks "login"
  const onFinish = useCallback((values) => {
    console.log("Finish:", values)
  }, [])

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
                  !form.isFieldsTouched(true) ||
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
