import { useQuery } from "@apollo/client"
import { Statistic, Row, Col, Table, Typography } from "antd"
import { useRouteMatch } from "react-router-dom"
import { QUERY_PUPIL_TESTS_OF_A_SUBJECT } from "../../queries"
import Loader from "../Loader"

const columns = [
  {
    title: "ID",
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
  },
  {
    title: "Grade",
    dataIndex: "score",
    key: "score",
    render: (value) => (value === null ? "Not available" : `${value}%`),
  },
]

export default function SubjectDetails(props) {
  const { pupilId } = props

  const { params } = useRouteMatch()

  const subjectId = params.id

  const { loading, data, error } = useQuery(QUERY_PUPIL_TESTS_OF_A_SUBJECT, {
    variables: {
      id: pupilId,
      subjectId,
    },
  })

  if (loading) return <Loader />
  if (error) return "Error"

  const tests = data?.pupil?.subjects[0].tests.map((test) => ({
    ...test,
    key: test.id,
    date: new Date(parseInt(test.date, 10)).toLocaleDateString(),
  }))

  const subjectName = data?.pupil?.subjects[0]?.name

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Subject"
            value={subjectName}
            className="statistic"
          />
        </Col>

        <Col span={12}>
          <Statistic
            title="Subject ID"
            value={subjectId}
            className="statistic"
          />
        </Col>
      </Row>

      <br />
      <br />
      <br />

      <Typography.Title level={4}>My Tests</Typography.Title>

      <Table pagination={false} columns={columns} dataSource={tests} />
    </>
  )
}
