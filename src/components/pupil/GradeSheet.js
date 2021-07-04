import { useQuery } from "@apollo/client"
import { Table, Typography } from "antd"
import { QUERY_GRADESHEET } from "../../queries"
import Loader from "../Loader"

const columns = [
  {
    title: "Subject ID",
    dataIndex: "subjectId",
    key: "subjectId",
  },
  {
    title: "Subject Name",
    dataIndex: "subjectName",
    key: "subjectName",
  },
  {
    title: "Class Name",
    dataIndex: "className",
    key: "className",
  },
  {
    title: "Avg. Grade",
    dataIndex: "avgGrade",
    key: "avgGrade",
    render: (value) => `${value}%`,
  },
]

export default function GradeSheet(props) {
  const { pupilId: id } = props

  const { error, data, loading } = useQuery(QUERY_GRADESHEET, {
    variables: {
      pupilId: id,
    },
  })

  if (loading) return <Loader />

  if (error) return "Error"

  return (
    <>
      <Typography.Title>My Gradesheet</Typography.Title>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data.gradesheet.map((grade) => ({
          ...grade,
          key: grade.id,
          avgGrade: Math.floor(grade.avgGrade),
        }))}
      />
    </>
  )
}
