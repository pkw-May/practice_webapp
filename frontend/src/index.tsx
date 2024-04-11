import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { AccountProvider } from './ContextAPI/AccountContext';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AccountProvider>
        <Router />
      </AccountProvider>
    </ThemeProvider>
  </>,
);
