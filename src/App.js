import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import RoutesIndex from './routes';
import Theme from './styles/Theme';

const Box = styled.div`
  ${({ theme }) => theme.whiteBox};
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Box>hello box</Box>

      <RoutesIndex isLoggedIn={false} />
    </ThemeProvider>
  );
}

export default App;
