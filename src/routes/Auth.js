import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Box = styled.div`
  ${({ theme }) => theme.whiteBox}
`;

function Auth() {
  const [action, setAction] = useState('logIn');

  return (
    <Wrapper>
      <StateChanger>
        {action === 'logIn' ? (
          <>
            Don't have an account? <Link onClick={() => setAction('signUp')}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account? <Link onClick={() => setAction('logIn')}>Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
}

export default Auth;
