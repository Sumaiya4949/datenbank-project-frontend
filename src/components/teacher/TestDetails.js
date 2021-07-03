import { Typography, Row, Col, Statistic, Table, Space } from "antd"
import { useRouteMatch } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { QUERY_TEST_DETAILS } from "../../queries"
import Loader from "../Loader"
import { useMemo } from "react"
import ScoreChanger from "./ScoreChanger"

const pupilTableStaticColumns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (username) => <b>@{username}</b>,
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
    title: "Score",
    dataIndex: "score",
    key: "score",
    render: (grade) => `${grade}%`,
  },
]

export default function TestDetails(props) {
  const { teacherId } = props
  const { params } = useRouteMatch()

  const testId = params.id

  const { data, error, loading } = useQuery(QUERY_TEST_DETAILS, {
    variables: { id: testId, teacherId },
  })

  const { date, id, name, subjectName, pupils } = data?.test || {}

  const pupilsWithGrade = useMemo(() => {
    if (!pupils) return []
    return pupils.map((pupil) => {
      return {
        ...pupil,
        key: pupil.id,
      }
    })
  }, [pupils])

  const pupilTableColumns = useMemo(
    () => [
      ...pupilTableStaticColumns,
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            <ScoreChanger
              subjectName={subjectName}
              teacherId={teacherId}
              pupil={record}
              testId={id}
              testName={name}
              currentScore={record.score}
            />
          </Space>
        ),
      },
    ],
    [id, name, subjectName, teacherId]
  )

  if (loading) return <Loader />
  if (error) return "Error"

  return (
    <div>
      <Typography.Title>
        Test: {subjectName} {name}
      </Typography.Title>
      <br />
      <br />

      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="ID" value={id} className="statistic" />
        </Col>
        <Col span={12}>
          <Statistic
            title="Date"
            value={new Date(parseInt(date, 10)).toLocaleDateString()}
            className="statistic"
          />
        </Col>
      </Row>

      <br />
      <br />
      <br />
      <br />

      <Typography.Title level={3}>Pupils in this subject</Typography.Title>
      <Table
        pagination={false}
        columns={pupilTableColumns}
        dataSource={pupilsWithGrade}
      />
    </div>
  )
}
