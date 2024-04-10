import React from 'react';
import styled from 'styled-components';

interface Warning {
  isInfo: boolean;
  warning: string;
}

const WarningLine: React.FC<Warning> = ({ isInfo, warning }) => {
  return <Wrapper $isInfo={isInfo}>{warning}</Wrapper>;
};

export default WarningLine;

const Wrapper = styled.div<{ $isInfo: boolean }>`
  width: 100%;
  ${({ theme }) => theme.flex.left}
  margin: 6px;

  ${({ $isInfo, theme }) => ($isInfo ? theme.fonts.info : theme.fonts.warning)}
  text-align: left;
`;
