import { useQuery } from "@apollo/client"
import { Typography, Row, Col, Statistic, Table } from "antd"
import { useRouteMatch } from "react-router-dom"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"
import Loader from "../Loader"

const columns = [
  {
    title: "Test ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Test",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => new Date(parseInt(date, 10)).toLocaleDateString(),
  },
]

export default function SubjectOverview(props) {
  const { teacherId } = props

  const { params } = useRouteMatch()

  const subjectId = params.id

  const { data, error, loading } = useQuery(QUERY_TEACHER_SUBJECT_OVERVIEW, {
    variables: {
      id: teacherId,
      subjectId,
    },
  })

  if (loading) return <Loader />
  if (error) return "Error"

  const subject = data.teacher.teaches[0]
  const { name, id, className, tests } = subject

  return (
    <div>
      <Typography.Title>Subject: {name}</Typography.Title>
      <br />
      <br />

      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Class" value={className} />
        </Col>
        <Col span={12}>
          <Statistic title="ID" value={id} />
        </Col>
      </Row>

      <br />
      <br />

      <Typography.Title level={3}>All tests</Typography.Title>
      <Table pagination={false} columns={columns} dataSource={tests} />
    </div>
  )
}
