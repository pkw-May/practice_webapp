import React from 'react';
import styled from 'styled-components';

interface Warning {
  warning: string;
}

const WarningLine: React.FC<Warning> = ({ warning }) => {
  return <Wrapper>{warning}</Wrapper>;
};

export default WarningLine;

const Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.left}
  margin: 6px;

  ${({ theme }) => theme.fonts.warning}
  text-align: left;
`;
