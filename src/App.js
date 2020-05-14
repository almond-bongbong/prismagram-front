import React from 'react';
import { gql } from 'apollo-boost';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import RoutesIndex from './routes';
import Theme from './styles/Theme';
import { useQuery } from 'react-apollo-hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/layout/Footer';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <RoutesIndex isLoggedIn={data.isLoggedIn} />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
