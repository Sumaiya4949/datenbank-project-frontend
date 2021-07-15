import { useCallback, useContext, useState } from "react"
import { Button, Modal, Select, Form, Input, notification } from "antd"
import { FileAddOutlined } from "@ant-design/icons"
import { useMutation, useQuery } from "@apollo/client"
import { MUTATION_CREATE_SUBJECT } from "../../mutations"
import { AuthContext } from "../../contexts"
import {
  QUERY_ADMIN_ALL_TEACHERS,
  QUERY_ALL_CLASSES,
  QUERY_ALL_SUBJECTS,
  QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS,
} from "../../queries"
import Loader from "../Loader"

export default function SubjectCreator(props) {
  const { classLabel } = props

  const { loggedInUser } = useContext(AuthContext)

  const {
    data: teachersData,
    loading: loadingTeachers,
    error: errorLoadingTeachers,
  } = useQuery(QUERY_ADMIN_ALL_TEACHERS)

  const [createSubject] = useMutation(MUTATION_CREATE_SUBJECT)

  const [form] = Form.useForm()

  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      const { name, teacherId } = await form.validateFields()

      await createSubject({
        variables: {
          adminId: loggedInUser.id,
          teacherId,
          name,
          class: classLabel,
        },
        refetchQueries: [
          { query: QUERY_ALL_CLASSES },
          {
            query: QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS,
            variables: {
              name: classLabel,
            },
          },
          {
            query: QUERY_ALL_SUBJECTS,
          },
        ],
      })

      form.resetFields()
      setModalOpen(false)
      notification["success"]({
        message: "Successfully created subject",
      })
    } catch (err) {
      notification["error"]({
        message: err.message,
      })
    }
  }, [form, createSubject, loggedInUser.id, classLabel])

  if (loadingTeachers) return <Loader />

  if (errorLoadingTeachers) return false

  const allTeachers = teachersData?.teachers || []

  return (
    <>
      <Button
        size="large"
        shape="round"
        className="admin-action-btn"
        onClick={() => setModalOpen(true)}
      >
        <FileAddOutlined /> Create Subject
      </Button>

      <Modal
        visible={isModalOpen}
        title={`Create a new subject in class ${classLabel}`}
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setModalOpen(false)}
        onOk={onSubmit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            label="Name of subject"
            name="name"
            rules={[
              {
                required: true,
                message: "Must have at least 4 characters",
                validator: (_, value) =>
                  value?.length > 4 ? Promise.resolve() : Promise.reject(),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Who will teach?"
            name="teacherId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a teacher" allowClear>
              {allTeachers.map(({ id, forename, username, surname }) => (
                <Select.Option key={id} value={id}>
                  {forename} {surname} <b>&nbsp;&nbsp;&nbsp;@{username}</b>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
