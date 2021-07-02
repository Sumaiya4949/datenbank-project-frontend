import { useContext } from "react"
import { AuthContext } from "../../contexts"
import AppSideNav from "../AppSideNav"
import { Link } from "react-router-dom"
import {
  UserOutlined,
  ProfileOutlined,
  SolutionOutlined,
} from "@ant-design/icons"
import Loader from "../Loader"
import { Menu } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_PUPIL_CLASS_AND_SUBJECTS } from "../../queries"

const { SubMenu } = Menu

export default function AppSideNavPupil() {
  const { loggedInUser } = useContext(AuthContext)

  const { id } = loggedInUser

  const { loading, error, data } = useQuery(QUERY_PUPIL_CLASS_AND_SUBJECTS, {
    variables: { id },
  })

  if (error) return "Error"

  return (
    <AppSideNav loggedInUser={loggedInUser}>
      <Menu.Item key="overview" icon={<SolutionOutlined />}>
        <Link to="/">Overview</Link>
      </Menu.Item>

      <Menu.Item key="gradesheet" icon={<ProfileOutlined />}>
        <Link to="/gradesheet">Gradesheet</Link>
      </Menu.Item>

      <SubMenu key="sub1" icon={<UserOutlined />} title="My Subjects">
        {loading && <Loader />}
        {!loading &&
          data.pupil.subjects.map((subject) => (
            <Menu.Item key={subject.id}>
              <Link to={`/subjects/${subject.id}`}>{subject.name}</Link>
            </Menu.Item>
          ))}
      </SubMenu>
    </AppSideNav>
  )
}
