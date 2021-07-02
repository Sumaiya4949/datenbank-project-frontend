import React from "react"
import { UserOutlined } from "@ant-design/icons"
import { List, Tag, Avatar, Typography, Descriptions } from "antd"
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

export default function UserList(props) {
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
