import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts"
import AppSideNav from "../AppSideNav"
import { Link } from "react-router-dom"
import { SolutionOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_ALL_CLASSES } from "../../queries"
import Loader from "../Loader"
import { BlockOutlined, ReadOutlined } from "@ant-design/icons"
import { allClassesVar } from "../../global-states"

const { SubMenu } = Menu

export default function AppSideNavAdmin() {
  const { loggedInUser, editLoggedInUserInfo } = useContext(AuthContext)

  // const { id } = loggedInUser

  const {
    loading: classesLoading,
    error: errorLoadingClasses,
    data: classesData,
  } = useQuery(QUERY_ALL_CLASSES)

  useEffect(
    function updateGlobalState() {
      if (classesData) {
        allClassesVar(classesData.classes.map((cls) => cls.name))
      }
    },
    [classesData]
  )

  if (classesLoading) return <Loader />

  if (errorLoadingClasses) return "Error"

  return (
    <AppSideNav
      loggedInUser={loggedInUser}
      editLoggedInUserInfo={editLoggedInUserInfo}
    >
      <Menu.Item key="overview" icon={<SolutionOutlined />}>
        <Link to="/">Overview</Link>
      </Menu.Item>

      <Menu.Item key="subjects" icon={<ReadOutlined />}>
        <Link to="/subjects">All Subjects</Link>
      </Menu.Item>

      <SubMenu key="classes" icon={<BlockOutlined />} title="All Classes">
        {classesData.classes.map((_class) => (
          <Menu.Item key={_class.name}>
            <Link to={`/classes/${_class.name}`}>{_class.name}</Link>
          </Menu.Item>
        ))}
      </SubMenu>
    </AppSideNav>
  )
}
