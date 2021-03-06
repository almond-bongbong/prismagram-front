import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 7px 0;
  font-size: 14px;
  cursor: pointer;
`;

function Button({ text, type, className, onClick }) {
  return (
    <Container type={type} className={className} onClick={onClick}>
      {text}
    </Container>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  type: 'submit',
};

export default Button;
