import { gql } from 'apollo-boost';

export const ME = gql`
  {
    seeMyProfile {
      id
      username
    }
  }
`;
