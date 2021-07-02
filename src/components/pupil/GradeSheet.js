import { useQuery } from "@apollo/client"
import { Table, Typography } from "antd"
import { useMemo } from "react"
import {
  QUERY_PUPIL_CLASS_AND_SUBJECTS,
  QUERY_TEST_GRADES,
} from "../../queries"

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
    title: "Avg. Grade",
    dataIndex: "avgGrade",
    key: "avgGrade",
    render: (value) => `${value}%`,
  },
]

function calcAvgGrade(subjectId, testResults) {
  const testScores = testResults
    .filter((result) => result.subjectId === subjectId)
    .map((result) => result.score)

  if (testScores.length === 0) return -1

  return testScores.reduce((a, b) => a + b, 0) / testScores.length
}

export default function GradeSheet(props) {
  const { pupilId: id } = props

  const {
    error: gradeQueryError,
    data: gradeData,
    loading: gradeQueryLoading,
  } = useQuery(QUERY_TEST_GRADES, {
    variables: { id },
  })

  const {
    error: subjectsQueryError,
    data: subjectsData,
    loading: subjectsQueryLoading,
  } = useQuery(QUERY_PUPIL_CLASS_AND_SUBJECTS, {
    variables: { id },
  })

  const tableData = useMemo(() => {
    if (!gradeData || !subjectsData) return []

    const subjectsWithAvgGrade = subjectsData.pupil.subjects.map(
      (subjectData, index) => {
        return {
          key: index,
          subjectId: subjectData.id,
          subjectName: subjectData.name,
          avgGrade: Math.floor(
            calcAvgGrade(subjectData.id, gradeData.pupil.appearsIn)
          ),
        }
      }
    )

    return subjectsWithAvgGrade.filter((item) => item.avgGrade >= 0)
  }, [gradeData, subjectsData])

  if (gradeQueryLoading || subjectsQueryLoading) return "Loading"

  if (subjectsQueryError || gradeQueryError) return "Error"

  console.log(gradeData, subjectsData)

  return (
    <>
      <Typography.Title>My Gradesheet</Typography.Title>
      <Table columns={columns} dataSource={tableData} />
    </>
  )
}
