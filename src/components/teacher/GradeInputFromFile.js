import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"
import Papa from "papaparse"
import axios from "axios"
import { useMemo } from "react"

const { Dragger } = Upload

export default function GradeInputFromFile(props) {
  const { testId } = props

  const inputProps = useMemo(
    () => ({
      name: "file",
      multiple: false,
      accept: ".csv",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      customRequest: ({ file, onSuccess }) => onSuccess("ok"),

      onChange(info) {
        const { status } = info.file
        if (status !== "uploading") {
          // console.log(info.file, info.fileList)
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`)
          Papa.parse(info.file.originFileObj, {
            complete: async (result) => {
              try {
                const data = result.data

                data.shift()

                await axios.post(
                  "/save-test-grades",
                  {
                    grades: data,
                    testId,
                  },
                  { withCredentials: true }
                )

                window.location.reload()
              } catch {}
            },
          })
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
      onDrop(e) {
        // console.log("Dropped files", e.dataTransfer.files)
      },
    }),
    [testId]
  )

  return (
    <Dragger {...inputProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag a .csv file to this area</p>
      <p className="ant-upload-hint">
        The test grades of all pupils in the .csv file will be uploaded to
        server
      </p>
    </Dragger>
  )
}
