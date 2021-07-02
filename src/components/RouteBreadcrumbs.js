import { Breadcrumb } from "antd"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"

export default function RouteBreadcrumbs() {
  const { pathname } = useLocation()

  const pathNames = useMemo(() => {
    const names = pathname.split("/")
    names.unshift("home")
    return names
  }, [pathname])

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {pathNames.map((name) => {
        return (
          <Breadcrumb.Item key={name} style={{ textTransform: "capitalize" }}>
            {name}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
