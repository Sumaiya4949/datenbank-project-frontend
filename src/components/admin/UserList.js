import React from "react"
import { UserOutlined, UserDeleteOutlined } from "@ant-design/icons"
import {
  List,
  Tag,
  Avatar,
  Space,
  Typography,
  Descriptions,
  Button,
} from "antd"
import { Collapse } from "antd"
import PupilAssigner from "./PupilAssigner"
import PupilDeassigner from "./PupilDeassigner"

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
  const { users, role } = props

  const color =
    role === "pupil" ? "green" : role === "teacher" ? "blue" : "crimson"

  return (
    <List
      grid={gridParams}
      dataSource={users}
      renderItem={(user) => (
        <List.Item>
          <Collapse>
            <Panel
              header={
                <Space>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: color, border: "none" }}
                  />

                  <Typography.Text>
                    <b style={{ marginLeft: "1rem" }}>
                      {user.forename} {user.surname}
                    </b>
                  </Typography.Text>
                </Space>
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
                {role === "pupil" && (
                  <Descriptions.Item label="Class" span={3}>
                    {user.className || <b>Unassigned</b>}
                  </Descriptions.Item>
                )}
                <Descriptions.Item>
                  <Space direction="vertical">
                    {role === "pupil" && (
                      <PupilAssigner pupil={user} pupilClass={user.className} />
                    )}

                    {role === "pupil" && user.className && (
                      <PupilDeassigner pupil={user} />
                    )}

                    <Button type="text" span={3} danger>
                      <UserDeleteOutlined />
                      Delete {role}
                    </Button>
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        </List.Item>
      )}
    />
  )
}
