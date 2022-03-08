import gql from "graphql-tag";

export const LOG_IN = gql`
  mutation LogIn($input: LogInInput, $date: String!) {
    logIn(input: $input, date: $date) {
      id
      token
      avatar
      hasWallet
      didRequest
      pomDuration
      shortBreakDuration
      longBreakDuration
      longBreakInterval
      pomCycle
      pomCount(date: $date)
      pomData {
        result {
          date
          count
        }
      }
      currentTasks {
        total
        result {
          id
          title
          amt
          isNew
          isFinished
          createdAt
        }
      }
    }
  }
`;
