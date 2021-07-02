import { useContext } from "react"
import { AuthContext } from "../../contexts"
import AppSideNav from "../AppSideNav"
import { Link } from "react-router-dom"
import { SolutionOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_ALL_CLASSES } from "../../queries"
import Loader from "../Loader"
import { BlockOutlined } from "@ant-design/icons"

const { SubMenu } = Menu

export default function AppSideNavTeacher() {
  const { loggedInUser } = useContext(AuthContext)

  // const { id } = loggedInUser

  // const { loading, error, data } = useQuery(QUERY_ALL_CLASSES)

  // if (loading) return <Loader />

  // if (error) return "Error"

  return (
    <AppSideNav loggedInUser={loggedInUser}>
      <Menu.Item key="overview" icon={<SolutionOutlined />}>
        <Link to="/">Overview</Link>
      </Menu.Item>

      {/* <SubMenu key="classes" icon={<BlockOutlined />} title="All Classes">
        {loading && <Loader />}

        {!loading &&
          data.classes.map((_class) => (
            <Menu.Item key={_class.name}>
              <Link to={`/classes/${_class.name}`}>{_class.name}</Link>
            </Menu.Item>
          ))}
      </SubMenu> */}
    </AppSideNav>
  )
}
