import { Form, Input, Button } from "antd"
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}
/* eslint-enable no-template-curly-in-string */

export default function UserInfoForm(props) {
  const { onSubmit, user } = props

  const onFinish = (values) => {
    console.log(values)

    onSubmit(values.user)
  }

  return (
    <Form
      {...layout}
      name="user-info-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{ user }}
    >
      <Form.Item name={["user", "forename"]} label="Forename">
        <Input />
      </Form.Item>

      <Form.Item name={["user", "surname"]} label="Surname">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
