import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #666;
  font-size: 24px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;

function Loading() {
  return <Container>Loading...</Container>;
}

export default Loading;
