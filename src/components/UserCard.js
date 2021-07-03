import { Card, Avatar, Modal, Tag } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons"
import studentImg from "../assets/images/student.jpeg"
import adminImg from "../assets/images/admin.png"
import teacherImg from "../assets/images/teacher.png"
import styles from "../styles/UserCard.module.css"
import { useState } from "react"
import UserInfoForm from "./forms/UserInfoForm"

const { Meta } = Card

export default function UserCard(props) {
  const { user } = props

  const { role, forename, surname, username } = user

  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setVisible(false)
  }

  const themeColor =
    role === "pupil"
      ? "green"
      : role === "admin"
      ? "crimson"
      : role === "teacher"
      ? "blue"
      : "gray"

  return (
    <Card
      style={{ width: "100%", fontSize: "1rem" }}
      cover={
        <img
          alt="example"
          src={
            role === "pupil"
              ? studentImg
              : role === "admin"
              ? adminImg
              : role === "teacher"
              ? teacherImg
              : null
          }
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" onClick={showModal} />,
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

            <Modal
              title="Edit your basic info"
              visible={visible}
              footer={null}
              onCancel={handleCancel}
            >
              <UserInfoForm user={user} onSubmit={() => setVisible(false)} />
            </Modal>
          </div>
        }
      />
    </Card>
  )
}
