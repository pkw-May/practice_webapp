import React from 'react';
import styled from 'styled-components';

type InputBoxType = 'content' | 'comment';
interface InputBoxProps {
  type: InputBoxType;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | any;
}

const InputBox: React.FC<InputBoxProps> = ({
  onChangeHandler,
  type,
}: InputBoxProps) => {
  return (
    <Wrapper
      onChange={e => {
        onChangeHandler(e);
      }}
      type={type}
    />
  );
};

export default InputBox;

const Wrapper = styled.textarea<{ type: InputBoxType }>`
  width: 100%;
  height: ${({ type }) => (type === 'content' ? '200px' : '48px')};
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
