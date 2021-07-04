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
      id
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

export const QUERY_PUPIL_OVERVIEW = gql`
  query PupilSummary($id: ID!) {
    pupil(id: $id) {
      id
      subjects {
        id
      }
      appearsIn {
        id
        score
      }
    }
  }
`

export const QUERY_ADMIN_ALL_USERS = gql`
  query AllUsers {
    admins {
      id
      username
      forename
      surname
    }
    teachers {
      id
      username
      forename
      surname
    }
    pupils {
      id
      username
      forename
      surname
    }
  }
`

export const QUERY_ADMIN_ALL_TEACHERS = gql`
  query AllTeachers {
    teachers {
      id
      username
      forename
      surname
    }
  }
`

export const QUERY_ALL_CLASSES = gql`
  query Classes {
    classes {
      name
    }
  }
`

export const QUERY_CLASS_WITH_SUBJECTS_AND_PUPILS = gql`
  query ClassWithSubjectsAndPupils($name: String!) {
    classes(name: $name) {
      name

      pupils {
        id
        username
        forename
        surname
      }

      subjects {
        id
        name
        isArchived
        tests {
          id
        }
      }
    }
  }
`

export const QUERY_TEACHER_SUBJECTS = gql`
  query TeacherSubjects($id: ID!) {
    teacher(id: $id) {
      id
      teaches {
        id
        name
        className
      }
    }
  }
`

export const QUERY_TEACHER_SUBJECT_OVERVIEW = gql`
  query TeacherSubjectOverview($id: ID!, $subjectId: ID!) {
    teacher(id: $id) {
      id
      teaches(id: $subjectId) {
        id
        name
        className

        tests {
          id
          name
          date
        }

        pupils {
          id
          username
          forename
          surname

          appearsIn {
            subjectId
            score
          }
        }
      }
    }
  }
`

export const QUERY_TEST_DETAILS = gql`
  query TestDetails($id: ID!, $teacherId: ID!) {
    test(id: $id, teacherId: $teacherId) {
      id
      name
      date
      subjectName

      pupils {
        id
        username
        forename
        surname
        score(testId: $id)
      }
    }
  }
`
