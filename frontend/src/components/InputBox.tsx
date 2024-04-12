import React from 'react';
import styled from 'styled-components';

export type InputBoxType = 'post' | 'comment';
interface InputBoxProps {
  type: InputBoxType;
  name: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | any;
  title?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  type,
  name,
  onChangeHandler,
  title,
}: InputBoxProps) => {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <Input
        onChange={e => {
          onChangeHandler(e);
        }}
        name={name}
        $type={type}
      />
    </Wrapper>
  );
};

export default InputBox;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h5`
  ${({ theme }) => theme.fonts.button}
  margin-bottom: 3px;
`;

const Input = styled.textarea<{ $type: InputBoxType }>`
  width: 100%;
  height: ${({ $type }) => ($type === 'post' ? '200px' : '48px')};
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
