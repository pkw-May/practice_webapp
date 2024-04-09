import React from 'react';
import styled from 'styled-components';

interface BtnProps {
  btnName: string;
  btnStyle?: BtnStyle;
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement> | any) => void | any;
}

interface BtnStyle {
  bgColor?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  fontColor?: string;
  smallFont?: boolean;
}

const Button: React.FC<BtnProps> = ({ btnName, btnStyle, onClickHandler }) => {
  return (
    <Wrapper
      btnStyle={btnStyle}
      onClick={e => {
        onClickHandler(e);
      }}
    >
      {btnName}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button<{ btnStyle?: BtnStyle }>`
  width: 100%;

  padding: ${({ btnStyle }) =>
    btnStyle?.smallFont ? '13px 8px' : '13px 40px'};

  border-radius: ${({ theme }) => theme.radius.basic};
  background-color: ${({ theme, btnStyle }) =>
    btnStyle?.bgColor && theme.colors[btnStyle.bgColor]};
  ${({ theme }) => theme.fonts.button}
  color: ${({ theme, btnStyle }) =>
    btnStyle?.fontColor
      ? theme.colors[btnStyle.fontColor]
      : theme.colors.darkGray};

  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    background-color: ${({ theme, btnStyle }) =>
      btnStyle?.hoverBgColor && theme.colors[btnStyle.hoverBgColor]};
    color: ${({ theme, btnStyle }) =>
      btnStyle?.hoverColor
        ? theme.colors[btnStyle.hoverColor]
        : theme.colors.white};
  }
`;
