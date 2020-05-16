import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icons from './Icons';

const Animation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${Animation} 1s linear infinite alternate;
`;

function Loader() {
  return (
    <Container>
      <Icons.Logo size={36} />
    </Container>
  );
}

export default Loader;
