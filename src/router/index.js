import React from 'react';
import HomeContainer from '../components/business/home/nxt-home-container';
import About from '../components/business/about';
import ErrorBoundary from '../components/composite/ix-error-boundary';
import { themed } from '../utils/themes';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginContainer from '../components/business/login/login-container';

export const AppRouter = {
  "/": () => <ErrorBoundary><ThemeProvider theme={themed}><LoginContainer/> </ThemeProvider> /></ErrorBoundary>,
  "/About": () => <About />,
  "/home": () => <ErrorBoundary><HomeContainer /></ErrorBoundary>
};