import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.span`
  font-weight: 600;
  user-select: none;
`;

function FatText({ text, className }) {
  return <Text className={className}>{text}</Text>;
}

FatText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FatText;
