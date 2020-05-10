import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${({ theme }) => theme.whiteBox}
`;

function Auth() {
  const [action, setAction] = useState('logIn');
  console.log('auth');
  return <Wrapper>{action === 'logIn' ? <Box>Log In</Box> : <Box>Sign Up</Box>}</Wrapper>;
}

export default Auth;
