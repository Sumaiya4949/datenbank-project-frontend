import { Table, Typography } from "antd"
import { Statistic, Row, Col, Button } from "antd"

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

const data = [
  { id: "132312", name: "asdasdsa", score: 32, date: "312312" },
  { id: "132312", name: "asdasdsa", score: 32, date: "312312" },
  { id: "132312", name: "asdasdsa", score: 32, date: "312312" },
]

export default function SubjectDetails() {
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

      <Table columns={columns} dataSource={data} />
    </>
  )
}
