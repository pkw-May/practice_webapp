import { css } from 'styled-components';

const colors = {
  white: 'rgb(255, 255, 255)',
  lightGray: 'rgb(240, 240, 240)',
  gray: 'rgb(200, 200, 200)',
  darkGray: 'rgb(150, 150, 150)',
  orange: 'rgb(255, 165, 0)',
  skyblue: 'rgb(51, 215, 255)',
  red: 'rgb(255, 51, 138)',
  green: 'rgb(51, 255, 162)',
  bgBlack: '#3c4756',
  black: '#313a47',
};

const fonts = {
  title: css`
    font: 700 24px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.white};
  `,
  button: css`
    font: 700 18px 'NotoSansKR';
  `,
  info: css`
    font: 300 15px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.green};
  `,
  warning: css`
    font: 300 15px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.red};
  `,
  content: css`
    font: 300 16px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.lightGray};
  `,
  comment: css`
    font: 300 16px 'NotoSansKR';
    color: ${({ theme }) => theme.colors.lightGray};
  `,
};

const radius = {
  basic: '5px',
  round: '8px',
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
