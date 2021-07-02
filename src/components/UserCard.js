import { Card, Avatar, Tag } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons"
import studentImg from "../assets/images/student.jpeg"
import styles from "../styles/UserCard.module.css"

const { Meta } = Card

export default function UserCard(props) {
  const { user } = props

  const { role, forename, surname, username } = user

  const themeColor = role === "pupil" ? "green" : "gray"

  return (
    <Card
      style={{ width: "100%", fontSize: "1rem" }}
      cover={<img alt="example" src={studentImg} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: themeColor }}
          />
        }
        title={`${forename} ${surname}`}
        description={
          <div className={styles.userDetails}>
            <i>@{username}</i>
            <Tag color={themeColor}>{role} account</Tag>
          </div>
        }
      />
    </Card>
  )
}