import { Typography, Row, Col, Statistic, Table, Space, Button } from "antd"
import { DeleteOutlined, InfoOutlined } from "@ant-design/icons"
import { useRouteMatch } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { QUERY_TEST_DETAILS } from "../../queries"
import Loader from "../Loader"

const pupilTableColumns = [
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
    variables: { id: testId },
  })

  if (loading) return <Loader />
  if (error) return "Error"

  const { date, id, name, subjectName, pupils } = data.test

  const pupilsWithGrade = pupils.map((pupil) => {
    return {
      ...pupil,
      key: pupil.id,
    }
  })

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
