import { useContext } from "react"
import { AuthContext } from "../../contexts"
import AppSideNav from "../AppSideNav"
import { Link } from "react-router-dom"
import { ReadOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_TEACHER_SUBJECTS } from "../../queries"
import Loader from "../Loader"

const { SubMenu } = Menu

export default function AppSideNavTeacher() {
  const { loggedInUser } = useContext(AuthContext)

  const { id } = loggedInUser

  const { loading, error, data } = useQuery(QUERY_TEACHER_SUBJECTS, {
    variables: { id },
  })

  if (loading) return <Loader />

  if (error) return "Error"

  return (
    <AppSideNav loggedInUser={loggedInUser}>
      {/* <Menu.Item key="subjects" icon={<SolutionOutlined />}>
        <Link to="/mypupils">My Pupils</Link>
      </Menu.Item> */}

      <SubMenu key="classes" icon={<ReadOutlined />} title="All Subjects">
        {data.teacher.teaches.map((subject) => (
          <Menu.Item key={subject.id}>
            <Link to={`/subjects/${subject.id}`}>
              {subject.className} - {subject.name}
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>
    </AppSideNav>
  )
}
