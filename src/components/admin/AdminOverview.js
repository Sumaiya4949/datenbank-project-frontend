import { Typography, Space } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"
import Loader from "../Loader"
import UserList from "./UserList"
import UserCreator from "./UserCreator"
import ClassCreator from "./ClassCreator"

export default function AdminOverview() {
  const { loading, error, data } = useQuery(QUERY_ADMIN_ALL_USERS)

  const { pupils, teachers, admins } = data || {}

  if (loading) return <Loader />
  if (error) return "Error"

  return (
    <>
      <Space>
        <UserCreator />
        <ClassCreator />
      </Space>

      <br />
      <br />
      <br />
      <br />

      <Typography.Title level={2}>Admins</Typography.Title>
      <UserList users={admins} role="admin" />
      <br />
      <br />

      <Typography.Title level={2}>Teachers</Typography.Title>
      <UserList users={teachers} role="teacher" />
      <br />
      <br />

      <Typography.Title level={2}>Pupils</Typography.Title>
      <UserList users={pupils} role="pupil" />
    </>
  )
}
