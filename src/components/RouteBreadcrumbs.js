import { Breadcrumb } from "antd"
import { useLocation } from "react-router-dom"

export default function RouteBreadcrumbs() {
  const { pathname } = useLocation()

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {pathname.split("/").map((_name) => {
        const name = _name === "" ? "home" : _name
        return (
          <Breadcrumb.Item key={name} style={{ textTransform: "capitalize" }}>
            {name}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
