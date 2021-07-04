import { useQuery } from "@apollo/client"
import { Typography, Row, Col, Statistic, Table, Space, Button } from "antd"
import { useRouteMatch, Link } from "react-router-dom"
import { QUERY_TEACHER_SUBJECT_OVERVIEW } from "../../queries"
import TestCreator from "./TestCreator"
import { InfoOutlined } from "@ant-design/icons"
import Loader from "../Loader"
import { useMemo } from "react"
import TestInfoEditor from "./TestInfoEditor"
import TestDeleter from "./TestDeleter"

const testTableStaticColumns = [
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

  const subject = data?.teacher?.teaches[0] || {}
  const { name, id, className, tests, pupils } = subject

  const testTableColumns = useMemo(
    () => [
      ...testTableStaticColumns,
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/tests/${record.id}`}>
              <Button>
                <InfoOutlined />
                Details
              </Button>
            </Link>

            <TestInfoEditor
              test={record}
              subjectId={subjectId}
              teacherId={teacherId}
              subjectName={name}
              classLabel={className}
            />

            <TestDeleter
              subjectId={subjectId}
              teacherId={teacherId}
              testId={record.id}
            />
          </Space>
        ),
      },
    ],
    [className, name, subjectId, teacherId]
  )

  if (loading) return <Loader />
  if (error) return "Error"

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
          <Statistic title="Class" value={className} className="statistic" />
        </Col>
        <Col span={12}>
          <Statistic title="ID" value={id} className="statistic" />
        </Col>
      </Row>

      <br />
      <br />
      <br />
      <br />

      <Typography.Title level={3}>All tests for this subject</Typography.Title>
      <TestCreator
        subjectId={subjectId}
        teacherId={teacherId}
        subjectName={name}
        classLabel={className}
      />

      <br />
      <br />

      <Table
        pagination={false}
        columns={testTableColumns}
        dataSource={tests.map((test) => ({ ...test, key: test.id }))}
      />

      <br />
      <br />
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
