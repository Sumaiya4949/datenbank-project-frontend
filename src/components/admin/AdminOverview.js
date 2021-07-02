import React from "react"
import { UserOutlined } from "@ant-design/icons"
import { List, Card, Avatar, Typography } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"
import Loader from "../Loader"

const gridParams = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 3,
}

function UserList(props) {
  const { users, color } = props
  return (
    <List
      grid={gridParams}
      dataSource={users}
      renderItem={(user) => (
        <List.Item>
          <Card
            title={
              <>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: color }}
                />
                <Typography.Text>
                  <b>
                    &nbsp;&nbsp;&nbsp;{user.forename} {user.surname}
                  </b>
                </Typography.Text>
              </>
            }
          >
            Card content
          </Card>
        </List.Item>
      )}
    />
  )
}

export default function AdminOverview() {
  const { loading, error, data } = useQuery(QUERY_ADMIN_ALL_USERS)

  if (loading) return <Loader />
  if (error) return "Error"

  const { pupils, teachers, admins } = data

  return (
    <>
      <Typography.Title level={2}>Admins</Typography.Title>
      <UserList users={admins} color="crimson" />
      <br />
      <br />

      <Typography.Title level={2}>Teachers</Typography.Title>
      <UserList users={teachers} color="blue" />
      <br />
      <br />

      <Typography.Title level={2}>Pupils</Typography.Title>
      <UserList users={pupils} color="green" />
    </>
  )
}
