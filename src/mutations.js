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

export const MUTATION_ADD_TEST = gql`
  mutation CreateTest($subjectId: ID!, $teacherId: ID!, $test: InputTest!) {
    createTest(subjectId: $subjectId, teacherId: $teacherId, test: $test) {
      id
      name
      date
    }
  }
`

export const MUTATION_EDIT_TEST = gql`
  mutation EditTest(
    $id: ID!
    $subjectId: ID!
    $teacherId: ID!
    $test: InputTest!
  ) {
    editTest(
      id: $id
      subjectId: $subjectId
      teacherId: $teacherId
      test: $test
    ) {
      id
      name
      date
    }
  }
`

export const MUTATION_EDIT_SCORE = gql`
  mutation EditScoreOfStudent(
    $teacherId: ID!
    $pupilId: ID!
    $testId: ID!
    $score: Float!
  ) {
    score: editScore(
      teacherId: $teacherId
      pupilId: $pupilId
      testId: $testId
      score: $score
    )
  }
`

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser($adminId: ID!, $user: InputUser!) {
    createUser(adminId: $adminId, user: $user)
  }
`

export const MUTATION_CREATE_CLASS = gql`
  mutation CreateClass($adminId: ID!, $class: String!) {
    createClass(adminId: $adminId, class: $class)
  }
`

export const MUTATION_CREATE_SUBJECT = gql`
  mutation CreateSubject(
    $adminId: ID!
    $teacherId: ID!
    $class: String!
    $name: String!
  ) {
    createSubject(
      adminId: $adminId
      teacherId: $teacherId
      class: $class
      name: $name
    ) {
      id
      name
    }
  }
`

export const MUTATION_ARCHIVE_SUBJECT = gql`
  mutation ArchiveSubject($adminId: ID!, $subjectId: ID!) {
    archiveSubjectByAdmin(adminId: $adminId, subjectId: $subjectId) {
      id
    }
  }
`

export const MUTATION_DELETE_SUBJECT = gql`
  mutation DeleteSubject($adminId: ID!, $subjectId: ID!) {
    response: deleteSubject(adminId: $adminId, subjectId: $subjectId) {
      success
      message
    }
  }
`
