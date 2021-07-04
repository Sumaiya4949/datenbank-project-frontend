import { useCallback, useState } from "react"
import { Button, Modal, Form, notification } from "antd"
import { PlusSquareOutlined } from "@ant-design/icons"
import moment from "moment"
import { useMutation } from "@apollo/client"
import { MUTATION_ADD_TEST } from "../../mutations"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"
import TestInfoForm from "../forms/TestInfoForm"

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
            name: values.name,
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

      notification["success"]({
        message: "Successfully created a test",
      })
    } catch (err) {
      notification["error"]({
        message: "Failed to create test",
      })
    }
  }, [form, subjectId, teacherId, createTest])

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        <PlusSquareOutlined /> Add a test
      </Button>

      <Modal
        visible={isModalOpen}
        title="Create Test"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <TestInfoForm form={form} breadcrumbs={[classLabel, subjectName]} />
      </Modal>
    </>
  )
}
