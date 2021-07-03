import { useCallback, useState } from "react"
import { Button, Modal, Form, InputNumber } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { MUTATION_EDIT_SCORE } from "../../mutations"
import { Breadcrumb } from "antd"
import { QUERY_TEST_DETAILS } from "../../queries"

export default function ScoreChanger(props) {
  const { subjectName, teacherId, testId, testName, currentScore, pupil } =
    props

  const [changeTestScore] = useMutation(MUTATION_EDIT_SCORE)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields()

      await changeTestScore({
        variables: {
          teacherId,
          pupilId: pupil.id,
          testId,
          score: values.score,
        },
        refetchQueries: [
          {
            query: QUERY_TEST_DETAILS,
            variables: { id: testId, teacherId },
          },
        ],
      })

      form.resetFields()
      setModalOpen(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [form, changeTestScore, teacherId, pupil.id, testId])

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        <EditOutlined /> Change Grade
      </Button>

      <Modal
        visible={isModalOpen}
        title={`Change Grade of ${pupil.forename} ${pupil.surname}`}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ score: currentScore }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>{subjectName}</Breadcrumb.Item>
            <Breadcrumb.Item>{testName}</Breadcrumb.Item>
          </Breadcrumb>

          <br />

          <Form.Item
            name="score"
            label="Score"
            className="collection-create-form_last-form-item"
            rules={[
              {
                required: true,
                message: "Not a valid score",
                validator: (_, value) =>
                  value && value >= 0 && value <= 100
                    ? Promise.resolve()
                    : Promise.reject(),
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
