import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Theme from './styles/Theme';

const Box = styled.div`
  ${({ theme }) => theme.whiteBox};
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      hello
      <Box>hello box</Box>
    </ThemeProvider>
  );
}

export default App;
