import { useCallback, useState } from "react"
import { Button, Modal, Form } from "antd"
import { EditOutlined } from "@ant-design/icons"
import moment from "moment"
import { useMutation } from "@apollo/client"
import { MUTATION_EDIT_TEST } from "../../mutations"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"
import TestInfoForm from "../forms/TestInfoForm"

export default function TestInfoEditor(props) {
  const { test, subjectId, teacherId, subjectName, classLabel } = props

  const [editTest] = useMutation(MUTATION_EDIT_TEST)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields()

      await editTest({
        variables: {
          id: test.id,
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
    } catch (err) {
      console.log(err.message)
    }
  }, [form, subjectId, teacherId, editTest, test.id])

  return (
    <>
      <Button type="primary" shape="circle" onClick={() => setModalOpen(true)}>
        <EditOutlined />
      </Button>

      <Modal
        visible={isModalOpen}
        title="Edit Test"
        okText="Edit"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <TestInfoForm
          form={form}
          breadcrumbs={[classLabel, subjectName, test.name]}
          initialValues={{
            name: test.name,
            date: moment(parseInt(test.date, 10)),
          }}
        />
      </Modal>
    </>
  )
}
