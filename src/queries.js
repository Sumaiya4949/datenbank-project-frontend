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

export const QUERY_PUPIL_TESTS_OF_A_SUBJECT = gql`
  query PupilSubjectTest($id: ID!, $subjectId: ID!) {
    pupil(id: $id) {
      subjects(id: $subjectId) {
        id
        tests {
          id
          name
          date
          score(pupilId: $id)
        }
      }
    }
  }
`
