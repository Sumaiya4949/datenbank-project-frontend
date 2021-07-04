import { useCallback } from "react"
import { Button, Modal, Form, notification } from "antd"
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { MUTATION_DELETE_TEST } from "../../mutations"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"

export default function TestDeleter(props) {
  const { testId, subjectId, teacherId } = props

  const [deleteTest] = useMutation(MUTATION_DELETE_TEST)

  const [form] = Form.useForm()

  const deleteTestOnConfirm = useCallback(async () => {
    Modal.confirm({
      title: `Do you want to delete this test?`,
      icon: <ExclamationCircleOutlined />,
      content: "All the test results of all pupils will get removed",

      async onOk() {
        try {
          await deleteTest({
            variables: {
              teacherId,
              testId,
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

          notification["success"]({
            message: "Successfully deleted test",
          })
        } catch (err) {
          notification["error"]({
            message: err.message,
          })
        }
      },
    })
  }, [deleteTest, teacherId, testId, subjectId, form])

  return (
    <Button type="primary" danger shape="circle" onClick={deleteTestOnConfirm}>
      <DeleteOutlined />
    </Button>
  )
}
