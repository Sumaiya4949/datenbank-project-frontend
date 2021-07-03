import { useCallback, useState } from "react"
import { Button, Modal, Form, DatePicker, Radio, Breadcrumb } from "antd"
import { PlusSquareOutlined } from "@ant-design/icons"
import moment from "moment"
import { useMutation } from "@apollo/client"
import { MUTATION_ADD_TEST } from "../../mutations"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"

export default function TestCreator(props) {
  const { subjectId, teacherId, subjectName, classLabel } = props

  const [createTest] = useMutation(MUTATION_ADD_TEST)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields()

      await createTest({
        variables: {
          subjectId,
          teacherId,
          test: {
            name: values.testName,
            date: moment(values.date).format("YYYY-MM-DD"),
          },
        },
        refetchQueries: [
          {
            query: QUERY_TEACHER_SUBJECT_OVERVIEW,
            variables: {
              id: teacherId,
              subjectId,
            },
          },
        ],
      })

      form.resetFields()
      setModalOpen(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [form, subjectId, teacherId, createTest])

  if (!isModalOpen)
    return (
      <Button type="primary" onClick={() => setModalOpen(true)}>
        <PlusSquareOutlined /> Add a test
      </Button>
    )
  else
    return (
      <Modal
        visible={isModalOpen}
        title="Create Test"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>{classLabel}</Breadcrumb.Item>
            <Breadcrumb.Item>{subjectName}</Breadcrumb.Item>
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
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    )
}
