import { css } from 'styled-components';

const colors = {
  white: '#FFFFFF',
  lightGray: '#D9D9D9',
  gray: '#989d9e',
  darkGray: '#515A58',
  orange: '#e08907',
  skyblue: '#04acc9',
  red: '#fa0075',
  green: '#13bf44',
  black: '#0e1d38',
};

const fonts = {
  title: css`
    font: 700 24px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.black};
  `,
  button: css`
    font: 700 18px 'NotoSansKR';
  `,
  info: css`
    font: 300 15px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.gray};
  `,
  warning: css`
    font: 300 15px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.red};
  `,
  content: css`
    font: 300 16px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.black};
  `,
  comment: css`
    font: 300 16px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.darkGray};
  `,
};

const radius = {
  basic: '8px',
  round: '10px',
};

const flex = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  left: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  right: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  between: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

const theme = {
  colors,
  fonts,
  radius,
  flex,
};

export default theme;
