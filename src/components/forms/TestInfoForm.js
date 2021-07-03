import { Form, DatePicker, Radio, Breadcrumb } from "antd"
import moment from "moment"

export default function TestInfoForm(props) {
  const { form, breadcrumbs } = props

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{
        modifier: "public",
      }}
    >
      <Breadcrumb>
        {breadcrumbs.map((crumb) => (
          <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <br />

      <Form.Item
        name="testName"
        label="Name of the test"
        className="collection-create-form_last-form-item"
        rules={[
          {
            required: true,
            message: "Test must have a name",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="Quiz">Quiz</Radio>
          <Radio value="Mock">Mock</Radio>
          <Radio value="Final">Final</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="date"
        label="Date of exam"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <DatePicker
          disabledDate={(current) => current && current < moment().endOf("day")}
        />
      </Form.Item>
    </Form>
  )
}
