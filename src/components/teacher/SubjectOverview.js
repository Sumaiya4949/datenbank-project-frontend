import { useQuery } from "@apollo/client"
import { Typography, Row, Col, Statistic, Table } from "antd"
import { useRouteMatch } from "react-router-dom"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"
import Loader from "../Loader"
import UserList from "../UserList"

const testTableColumns = [
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

const pupilTableColumns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Forename",
    dataIndex: "forename",
    key: "forename",
  },
  {
    title: "Surname",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "Avg. Grade",
    dataIndex: "avgGrade",
    key: "avgGrade",
    render: (grade) => `${grade}%`,
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
  const { name, id, className, tests, pupils } = subject

  const pupilsWithAvgGrade = pupils.map((pupil) => {
    return {
      ...pupil,
      key: pupil.id,
      avgGrade: pupil.appearsIn
        .filter((test) => test.subjectId === subjectId)
        .map((test) => test.score)
        .reduce((x, y) => (x + y) / 2),
    }
  })

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

      <Typography.Title level={3}>All tests for this subject</Typography.Title>
      <Table
        pagination={false}
        columns={testTableColumns}
        dataSource={tests.map((test) => ({ ...test, key: test.id }))}
      />

      <br />
      <br />

      <Typography.Title level={3}>Pupils in this subject</Typography.Title>
      <Table
        pagination={false}
        columns={pupilTableColumns}
        dataSource={pupilsWithAvgGrade}
      />
    </div>
  )
}
