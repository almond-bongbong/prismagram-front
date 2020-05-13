import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0 15px;
`;

const Input = ({ type, value, onChange, placeholder, required }) => (
  <Container
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  required: true,
};

export default Input;
