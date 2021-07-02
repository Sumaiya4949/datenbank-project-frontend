import { useQuery } from "@apollo/client"
import { Typography } from "antd"
import { useRouteMatch } from "react-router-dom"
import { QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS } from "../../queries"
import Loader from "../Loader"
import UserList from "../UserList"
import { List, Avatar } from "antd"
import { ReadOutlined } from "@ant-design/icons"

export default function ClassOverview(props) {
  const { params } = useRouteMatch()

  const { loading, data, error } = useQuery(
    QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS,
    {
      variables: {
        name: params.className,
      },
    }
  )

  if (loading) return <Loader />
  if (error) return "Error"

  const classDetails = data.classes[0]

  return (
    <div>
      <Typography.Title leve={2}>Class: {params.className}</Typography.Title>
      <br />
      <br />

      <Typography.Title level={3}>
        All subjects in {params.className}
      </Typography.Title>

      <br />

      <List
        itemLayout="horizontal"
        dataSource={classDetails.subjects}
        renderItem={(subject) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<ReadOutlined />}
                  style={{ backgroundColor: "#8a2be2" }}
                />
              }
              title={subject.name}
              description={subject.id}
            />
          </List.Item>
        )}
      />

      <br />
      <br />

      <Typography.Title level={3}>
        All pupils in {params.className}
      </Typography.Title>

      <br />

      <UserList users={classDetails.pupils} color="green" />
    </div>
  )
}
