import React from 'react';
import { gql } from 'apollo-boost';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import RoutesIndex from './routes';
import Theme from './styles/Theme';
import { useQuery } from 'react-apollo-hooks';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

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
      <Wrapper>
        <GlobalStyles />
        <Box>hello box</Box>
        <RoutesIndex isLoggedIn={data.isLoggedIn} />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
