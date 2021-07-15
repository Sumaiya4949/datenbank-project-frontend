import { useQuery } from "@apollo/client"
import { Descriptions, Tag } from "antd"
import { QUERY_PUPIL_OVERVIEW } from "../../queries"
import Loader from "../Loader"

const Item = Descriptions.Item

export default function PupilOverview(props) {
  const { pupil } = props

  const { surname, forename, id, username, role } = pupil

  const { error, data, loading } = useQuery(QUERY_PUPIL_OVERVIEW, {
    variables: { id },
  })

  if (loading) return <Loader />

  if (error) return "Error"

  const { appearsIn, subjects, className } = data?.pupil

  const totalGrade = appearsIn
    .map((item) => item.score)
    .reduce((x, y) => x + y, 0)

  const avgGrade = totalGrade / appearsIn.length

  return (
    <Descriptions
      title={`${forename}'s information`}
      style={{ padding: "2rem", backgroundColor: "#fff" }}
      bordered
    >
      <Item label="ID" span={3}>
        {id}
      </Item>
      <Item label="Forename" span={1}>
        {forename}
      </Item>
      <Item label="Surname" span={1}>
        {surname}
      </Item>
      <Item label="Username" span={1}>
        <i>
          <b>@{username}</b>
        </i>
      </Item>
      <Item label="Account Type" span={2}>
        <Tag color={"green"}>{role} account</Tag>
      </Item>
      <Item label="Class" span={1}>
        {className}
      </Item>
      <Item label="Total Subjects" span={1}>
        {subjects.length || 0}
      </Item>
      <Item label="Tests Taken" span={1}>
        {appearsIn.length || 0}
      </Item>
      <Item label="Average Grade" span={1}>
        {appearsIn.length === 0 ? "Not available" : `${avgGrade}%`}
      </Item>
    </Descriptions>
  )
}
