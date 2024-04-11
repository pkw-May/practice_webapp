import React from 'react';
import styled from 'styled-components';

interface InputLineProps {
  type: string;
  title?: string;
  name: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void | any;
}

const InputLine: React.FC<InputLineProps> = ({
  type,
  title,
  name,
  onChangeHandler,
}) => {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <Input
        type={type}
        name={name}
        onChange={e => {
          onChangeHandler(e);
        }}
      />
    </Wrapper>
  );
};

export default InputLine;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h5`
  ${({ theme }) => theme.fonts.button}
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 100%;
  height: auto;
  padding: 15px;
  ${({ theme }) => theme.flex.left}
  border-radius: ${({ theme }) => theme.radius.basic};
  border: 1px solid ${({ theme }) => theme.colors.gray};

  &:focus {
    border: none;
    outline: 2px solid ${({ theme }) => theme.colors.skyblue} !important;
    border-radius: ${({ theme }) => theme.radius.basic};
  }
`;
