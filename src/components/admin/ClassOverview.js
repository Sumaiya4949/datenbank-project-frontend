import { useMutation, useQuery } from "@apollo/client"
import { Typography } from "antd"
import { useRouteMatch } from "react-router-dom"
import { QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS } from "../../queries"
import Loader from "../Loader"
import UserList from "./UserList"
import { List, Avatar, Space, Button, Modal, notification } from "antd"
import {
  ReadOutlined,
  DeleteOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import SubjectCreator from "./SubjectCreator"
import { useCallback } from "react"
import {
  MUTATION_ARCHIVE_SUBJECT,
  MUTATION_DELETE_SUBJECT,
} from "../../mutations"

const gridParams = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 3,
}

export default function ClassOverview(props) {
  const { adminId } = props

  const { params } = useRouteMatch()

  const { loading, data, error } = useQuery(
    QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS,
    {
      variables: {
        name: params.className,
      },
    }
  )

  const [archiveSubject] = useMutation(MUTATION_ARCHIVE_SUBJECT)
  const [deleteSubject] = useMutation(MUTATION_DELETE_SUBJECT)

  const archiveSubjectOnConfirm = useCallback(
    (subjectId) => {
      Modal.confirm({
        title: "Are you sure to archive?",
        icon: <ExclamationCircleOutlined />,

        async onOk() {
          try {
            await archiveSubject({
              variables: {
                adminId,
                subjectId,
              },
              refetchQueries: [
                {
                  query: QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS,
                  variables: {
                    name: params.className,
                  },
                },
              ],
            })

            notification["success"]({
              message: "Successfully archived",
            })
          } catch {
            notification["error"]({
              message: "Archive failed",
            })
          }
        },
      })
    },
    [adminId, archiveSubject, params.className]
  )

  const deleteSubjectOnConfirm = useCallback(
    (subjectId) => {
      Modal.confirm({
        title: "Are you sure to delete?",
        icon: <ExclamationCircleOutlined />,

        async onOk() {
          try {
            const { data } = await deleteSubject({
              variables: {
                adminId,
                subjectId,
              },
              refetchQueries: [
                {
                  query: QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS,
                  variables: {
                    name: params.className,
                  },
                },
              ],
            })

            notification[data.response.success ? "success" : "error"]({
              message: data.response.message,
            })
          } catch {
            notification["error"]({
              message: "Request failed",
            })
          }
        },
      })
    },
    [adminId, deleteSubject, params.className]
  )

  if (loading) return <Loader />
  if (error) return "Error"

  const classDetails = data.classes[0]

  return (
    <div>
      <Typography.Title leve={2}>Class: {params.className}</Typography.Title>

      <Space>
        <SubjectCreator classLabel={params.className} />
      </Space>

      <br />
      <br />
      <br />

      <Typography.Title level={3}>
        All subjects in {params.className}
      </Typography.Title>

      <br />

      <List
        itemLayout="horizontal"
        dataSource={classDetails.subjects}
        grid={gridParams}
        renderItem={(subject) => (
          <List.Item
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={
                    subject.isArchived ? <LockOutlined /> : <ReadOutlined />
                  }
                  style={{
                    backgroundColor: subject.isArchived ? "crimson" : "#8a2be2",
                  }}
                />
              }
              title={
                <Typography.Title level={5}>{subject.name}</Typography.Title>
              }
              description={
                <Space direction="vertical">
                  <Typography.Text>{subject.id}</Typography.Text>

                  <Space direction="horizontal">
                    {subject.isArchived && (
                      <i style={{ color: "teal", fontWeight: "bold" }}>
                        (Archived)
                      </i>
                    )}

                    {!subject.isArchived && (
                      <>
                        {/* Only subjects having tests can be archived */}
                        {!!subject.tests.length && (
                          <Button
                            type="text"
                            style={{ color: "teal" }}
                            onClick={() => archiveSubjectOnConfirm(subject.id)}
                          >
                            <LockOutlined />
                            Archive
                          </Button>
                        )}

                        {/* Only subjects without dependent tests can be removed */}
                        {!subject.tests.length && (
                          <Button
                            type="text"
                            danger
                            onClick={() => deleteSubjectOnConfirm(subject.id)}
                          >
                            <DeleteOutlined />
                            Delete
                          </Button>
                        )}
                      </>
                    )}
                  </Space>
                </Space>
              }
            />
          </List.Item>
        )}
      />

      <br />
      <br />

      <Typography.Title level={3}>
        All pupils in {params.className}
      </Typography.Title>

      <br />

      <UserList users={classDetails.pupils} role="pupil" />
    </div>
  )
}
