import { Card, Avatar, Modal, notification, Tag } from "antd"
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
import { useCallback, useMemo, useState } from "react"
import UserInfoForm from "./forms/UserInfoForm"
import { useMutation } from "@apollo/client"
import {
  MUTATION_EDIT_ADMIN_BASIC_INFO,
  MUTATION_EDIT_PUPIL_BASIC_INFO,
  MUTATION_EDIT_TEACHER_BASIC_INFO,
} from "../mutations"

const { Meta } = Card

export default function UserCard(props) {
  const { user, editLoggedInUserInfo } = props

  const { role, forename, surname, username } = user

  const [userEditFormModalVisible, setUserEditFormModalVisible] =
    useState(false)

  const MUTATION = useMemo(
    () =>
      role === "pupil"
        ? MUTATION_EDIT_PUPIL_BASIC_INFO
        : role === "teacher"
        ? MUTATION_EDIT_TEACHER_BASIC_INFO
        : role === "admin"
        ? MUTATION_EDIT_ADMIN_BASIC_INFO
        : null,
    [role]
  )

  const [editUser] = useMutation(MUTATION)

  const showUserEditFormModal = useCallback(() => {
    setUserEditFormModalVisible(true)
  }, [])

  const handleCancel = useCallback(() => {
    console.log("Clicked cancel button")
    setUserEditFormModalVisible(false)
  }, [])

  const onUserEditSubmit = useCallback(
    async (editedUserInfo) => {
      try {
        await editUser({ variables: { userInfo: editedUserInfo, id: user.id } })
      } catch {
        notification["error"]({
          message: "Failed to edit info",
        })
      }

      setUserEditFormModalVisible()
      editLoggedInUserInfo(editedUserInfo)
    },
    [editUser, user.id, editLoggedInUserInfo]
  )

  const themeColor = useMemo(
    () =>
      role === "pupil"
        ? "green"
        : role === "admin"
        ? "crimson"
        : role === "teacher"
        ? "blue"
        : "gray",
    [role]
  )

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
        <EditOutlined key="edit" onClick={showUserEditFormModal} />,
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
              visible={userEditFormModalVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <UserInfoForm user={user} onSubmit={onUserEditSubmit} />
            </Modal>
          </div>
        }
      />
    </Card>
  )
}
