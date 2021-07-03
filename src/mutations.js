import { gql } from "@apollo/client"

export const MUTATION_EDIT_PUPIL_BASIC_INFO = gql`
  mutation EditUser($id: ID!, $userInfo: InputUserInfo!) {
    editPupilInfo(id: $id, userInfo: $userInfo) {
      id
      forename
      surname
    }
  }
`

export const MUTATION_EDIT_TEACHER_BASIC_INFO = gql`
  mutation EditUser($id: ID!, $userInfo: InputUserInfo!) {
    editTeacherInfo(id: $id, userInfo: $userInfo) {
      id
      forename
      surname
    }
  }
`

export const MUTATION_EDIT_ADMIN_BASIC_INFO = gql`
  mutation EditUser($id: ID!, $userInfo: InputUserInfo!) {
    editAdminInfo(id: $id, userInfo: $userInfo) {
      id
      forename
      surname
    }
  }
`
