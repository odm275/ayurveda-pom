import gql from 'graphql-tag';

export const UPDATE_TASKS = gql`
  mutation UpdateTasks($input: UpdateTaskUserInput) {
    updateTasks(input: $input) {
      total
    }
  }
`;
