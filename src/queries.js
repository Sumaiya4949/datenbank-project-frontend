import { gql } from "@apollo/client"

export const QUERY_PUPIL_CLASS_AND_SUBJECTS = gql`
  query PupilClassWithSubjects($id: ID!) {
    pupil(id: $id) {
      className
      subjects {
        id
        name
      }
    }
  }
`

export const QUERY_TEST_GRADES = gql`
  query TestGrades($id: ID!) {
    pupil(id: $id) {
      appearsIn {
        subjectId
        score
      }
    }
  }
`
