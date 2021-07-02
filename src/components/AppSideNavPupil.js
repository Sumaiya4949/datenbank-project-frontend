import { useContext } from "react"
import { AuthContext } from "../contexts"
import AppSideNav from "./AppSideNav"
import {
  UserOutlined,
  ProfileOutlined,
  SolutionOutlined,
} from "@ant-design/icons"

import { Menu } from "antd"
import { gql, useQuery } from "@apollo/client"

const { SubMenu } = Menu

const QUERY_PUPIL_CLASS_AND_SUBJECTS = gql`
  query PupilClassWithSubjects($id: ID!) {
    pupil(id: $id) {
      className
      subjects {
        id
        name
      }
    }
  }
`

export default function AppSideNavPupil() {
  const { loggedInUser } = useContext(AuthContext)

  const { id } = loggedInUser

  const { loading, error, data } = useQuery(QUERY_PUPIL_CLASS_AND_SUBJECTS, {
    variables: { id },
  })

  if (loading) return "Loading"
  if (error) return "Error"

  const { className, subjects } = data.pupil

  return (
    <AppSideNav loggedInUser={loggedInUser}>
      <Menu.Item key="overview" icon={<SolutionOutlined />}>
        Overview
      </Menu.Item>

      <Menu.Item key="gradesheet" icon={<ProfileOutlined />}>
        Gradesheet
      </Menu.Item>

      <SubMenu key="sub1" icon={<UserOutlined />} title="My Subjects">
        {subjects.map((subject) => (
          <Menu.Item key={subject.id}>{subject.name}</Menu.Item>
        ))}
      </SubMenu>
    </AppSideNav>
  )
}
