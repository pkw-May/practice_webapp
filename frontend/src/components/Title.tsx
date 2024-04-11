import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <Wrapper>{title}</Wrapper>;
};

export default Title;

const Wrapper = styled.h3`
  ${({ theme }) => theme.fonts.title}
  padding: 20px
`;
