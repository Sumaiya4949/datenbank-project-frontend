import React from "react"
import { UserOutlined } from "@ant-design/icons"
import { List, Tag, Avatar, Typography, Descriptions } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"
import Loader from "../Loader"
import { Collapse } from "antd"

const { Panel } = Collapse

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
          <Collapse>
            <Panel
              header={
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
              <Descriptions>
                <Descriptions.Item label="ID" span={3}>
                  {user.id}
                </Descriptions.Item>
                <Descriptions.Item label="Username" span={3}>
                  <Tag>@{user.username}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Forename" span={3}>
                  {user.forename}
                </Descriptions.Item>
                <Descriptions.Item label="Surname" span={3}>
                  {user.surname}
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
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
