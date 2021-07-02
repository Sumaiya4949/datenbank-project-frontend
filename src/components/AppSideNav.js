import UserCard from "./UserCard"
import {
  UserOutlined,
  ProfileOutlined,
  SolutionOutlined,
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { useContext } from "react"
import { AuthContext } from "../contexts"

const { SubMenu } = Menu
const { Sider } = Layout

export default function AppAppSideNavSidebar() {
  const { loggedInUser } = useContext(AuthContext)

  return (
    <Sider width={250}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <UserCard user={loggedInUser} />

        <Menu.Item key="overview" icon={<SolutionOutlined />}>
          Overview
        </Menu.Item>

        <Menu.Item key="gradesheet" icon={<ProfileOutlined />}>
          Gradesheet
        </Menu.Item>

        <SubMenu key="sub1" icon={<UserOutlined />} title="My Subjects">
          <Menu.Item key="3">Math</Menu.Item>
          <Menu.Item key="4">Physics</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
