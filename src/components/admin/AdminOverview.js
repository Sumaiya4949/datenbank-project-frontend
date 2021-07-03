import { Typography, Space } from "antd"
import { useQuery } from "@apollo/client"
import { QUERY_ADMIN_ALL_USERS } from "../../queries"
import Loader from "../Loader"
import UserList from "../UserList"
import UserCreator from "./UserCreator"

export default function AdminOverview() {
  const { loading, error, data } = useQuery(QUERY_ADMIN_ALL_USERS)

  if (loading) return <Loader />
  if (error) return "Error"

  const { pupils, teachers, admins } = data

  return (
    <>
      <Space>
        <UserCreator />
      </Space>
      <br />
      <br />
      <br />
      <br />

      <Typography.Title level={2}>Admins</Typography.Title>
      <UserList users={admins} color="crimson" />
      <br />
      <br />

      <Typography.Title level={2}>Teachers</Typography.Title>
      <UserList users={teachers} color="blue" />
      <br />
      <br />

      <Typography.Title level={2}>Pupils</Typography.Title>
      <UserList users={pupils} color="green" />
    </>
  )
}
