import React from 'react';
import { gql } from 'apollo-boost';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import RoutesIndex from './routes';
import Theme from './styles/Theme';
import { useQuery } from 'react-apollo-hooks';

const Box = styled.div`
  ${({ theme }) => theme.whiteBox};
`;

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery(QUERY);
  console.log(data);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Box>hello box</Box>
      <RoutesIndex isLoggedIn={data.isLoggedIn} />
    </ThemeProvider>
  );
}

export default App;
