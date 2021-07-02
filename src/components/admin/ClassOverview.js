import { Typography } from "antd"
import { useRouteMatch } from "react-router-dom"

export default function ClassOverview(props) {
  const { params } = useRouteMatch()

  return (
    <div>
      <Typography.Title>Class: {params.className}</Typography.Title>
    </div>
  )
}
