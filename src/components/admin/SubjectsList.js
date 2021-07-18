import { useMutation, useQuery } from "@apollo/client"
import { QUERY_ALL_SUBJECTS } from "../../queries"
import { Space, Button, Typography, Table } from "antd"
import { DeleteOutlined, LockOutlined } from "@ant-design/icons"
import Loader from "../Loader"
import {
  MUTATION_ARCHIVE_SUBJECT,
  MUTATION_DELETE_SUBJECT,
} from "../../mutations"
import { useCallback } from "react"
import { Modal, notification } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

export default function SubjectsList(props) {
  const { adminId } = props

  const {
    loading: subjectsLoading,
    error: errorLoadingSubjects,
    data: subjectsData,
  } = useQuery(QUERY_ALL_SUBJECTS)

  const [archiveSubject] = useMutation(MUTATION_ARCHIVE_SUBJECT)
  const [deleteSubject] = useMutation(MUTATION_DELETE_SUBJECT)

  const archiveSubjectOnConfirm = useCallback(
    (subjectId) => {
      Modal.confirm({
        title: "Are you sure to archive?",
        icon: <ExclamationCircleOutlined />,

        async onOk() {
          try {
            await archiveSubject({
              variables: {
                adminId,
                subjectId,
              },
              refetchQueries: [{ query: QUERY_ALL_SUBJECTS }],
            })

            notification["success"]({
              message: "Successfully archived",
            })
          } catch (err) {
            notification["error"]({
              message: "Archive failed: " + err.message,
            })
          }
        },
      })
    },
    [adminId, archiveSubject]
  )

  const deleteSubjectOnConfirm = useCallback(
    (subjectId) => {
      Modal.confirm({
        title: "Are you sure to delete?",
        icon: <ExclamationCircleOutlined />,

        async onOk() {
          try {
            const { data } = await deleteSubject({
              variables: {
                adminId,
                subjectId,
              },
              refetchQueries: [{ query: QUERY_ALL_SUBJECTS }],
            })

            notification[data.response.success ? "success" : "error"]({
              message: data.response.message,
            })
          } catch {
            notification["error"]({
              message: "Request failed",
            })
          }
        },
      })
    },
    [adminId, deleteSubject]
  )

  if (subjectsLoading) return <Loader />
  if (errorLoadingSubjects) return "Error"

  const columns = [
    {
      title: "Subject ID",
      dataIndex: "id",
      key: "subjectId",
    },
    {
      title: "Subject Name",
      dataIndex: "name",
      key: "subjectName",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Actions",
      key: "actions",
      render: (subject) => (
        <Space size="middle">
          {!subject.isArchived && !subject.tests.length && (
            <Button danger onClick={() => deleteSubjectOnConfirm(subject.id)}>
              <DeleteOutlined />
              Delete
            </Button>
          )}
          {!subject.isArchived && !!subject.tests.length && (
            <Button onClick={() => archiveSubjectOnConfirm(subject.id)}>
              <LockOutlined />
              Archive
            </Button>
          )}
          {subject.isArchived && <i>Archived</i>}
        </Space>
      ),
    },
  ]

  const subjects = subjectsData.subjects.map((sub) => ({ ...sub, key: sub.id }))

  return (
    <>
      <Typography.Title>All Subjects</Typography.Title>
      <Table pagination={false} columns={columns} dataSource={subjects} />
    </>
  )
}
