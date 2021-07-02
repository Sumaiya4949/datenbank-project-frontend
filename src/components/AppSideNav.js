import UserCard from "./UserCard"
import { Layout, Menu } from "antd"

const { Sider } = Layout

export default function AppAppSideNavSidebar(props) {
  const { loggedInUser, children } = props

  return (
    <Sider width={"30vw"}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <UserCard user={loggedInUser} />

        {children}
      </Menu>
    </Sider>
  )
}
