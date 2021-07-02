import { Spin, Space } from "antd"

export default function Loader() {
  return (
    <Space style={{ width: "100%" }} size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  )
}
