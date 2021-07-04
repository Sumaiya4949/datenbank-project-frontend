import { useQuery } from "@apollo/client"
import { QUERY_ALL_SUBJECTS } from "../../queries"
import { Space, Button, Typography, Table } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import Loader from "../Loader"

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
    render: (text, record) => (
      <Space size="middle">
        <Button danger>
          <DeleteOutlined />
          Delete
        </Button>
      </Space>
    ),
  },
]

export default function SubjectsList() {
  const {
    loading: subjectsLoading,
    error: errorLoadingSubjects,
    data: subjectsData,
  } = useQuery(QUERY_ALL_SUBJECTS)

  if (subjectsLoading) return <Loader />
  if (errorLoadingSubjects) return "Error"

  const subjects = subjectsData.subjects.map((sub) => ({ ...sub, key: sub.id }))

  return (
    <>
      <Typography.Title>All Subjects</Typography.Title>
      <Table pagination={false} columns={columns} dataSource={subjects} />
    </>
  )
}
