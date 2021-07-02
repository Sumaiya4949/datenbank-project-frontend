import { Descriptions, Tag, Row, Col, Statistic } from "antd"

const Item = Descriptions.Item

export default function PupilOverview(props) {
  const { pupil } = props
  const { surname, forename, id, username, role } = pupil

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
      <Item label="Account Type" span={3}>
        <Tag color={"green"}>{role} account</Tag>
      </Item>
      <Item label="Total Subjects" span={1}>
        10
      </Item>
      <Item label="Tests Taken" span={1}>
        12
      </Item>
      <Item label="Average Grade" span={1}>
        12%
      </Item>
    </Descriptions>
  )
}
