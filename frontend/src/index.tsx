import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';

import {
  AccountContextProvider,
  PostsContextProvider,
  CommentsContextProvider,
} from './ContextAPI';

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
      <AccountContextProvider>
        <PostsContextProvider>
          <CommentsContextProvider>
            <Router />
          </CommentsContextProvider>
        </PostsContextProvider>
      </AccountContextProvider>
    </ThemeProvider>
  </>,
);
