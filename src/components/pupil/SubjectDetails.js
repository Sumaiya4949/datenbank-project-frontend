import { useQuery } from "@apollo/client"
import { Table, Typography } from "antd"
import { Statistic, Row, Col } from "antd"
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
    render: (value) => `${value}%`,
  },
]

const tData = [
  { key: "1", id: "132312", name: "asdasdsa", score: 32, date: "312312" },
  { key: "2", id: "132312", name: "asdasdsa", score: 32, date: "312312" },
  { key: "3", id: "132312", name: "asdasdsa", score: 32, date: "312312" },
]

export default function SubjectDetails(props) {
  const { pupilId } = props

  const { params } = useRouteMatch()

  const { loading, data, error } = useQuery(QUERY_PUPIL_TESTS_OF_A_SUBJECT, {
    variables: {
      id: pupilId,
      subjectId: params.id,
    },
  })

  if (loading) return <Loader />
  if (error) return "Error"

  console.log(data)

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Subject" value={"Math"} />
        </Col>

        <Col span={12}>
          <Statistic title="Subject ID" value={"sdasdasds"} />
        </Col>
      </Row>

      <br />
      <br />
      <br />

      <Typography.Title level={3}>Tests</Typography.Title>

      <Table columns={columns} dataSource={tData} />
    </>
  )
}
