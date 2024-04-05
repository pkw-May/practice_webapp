import React from 'react';
import styled from 'styled-components';

interface InputLineProps {
  type: string;
  name: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void | any;
}

const InputLine: React.FC<InputLineProps> = ({
  type,
  name,
  onChangeHandler,
}) => {
  return (
    <Wrapper>
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
  border-radius: ${({ theme }) => theme.radius.basic};
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

const Input = styled.input`
  width: 100%;
  height: auto;
  padding: 15px;
  ${({ theme }) => theme.flex.left}
`;
