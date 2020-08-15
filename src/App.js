import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store/configure-store';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppRoute } from './router/app-route';
import { theme } from './utils/themes';
import ErrorNotification from './components/composite/ix-error-notification';
import './App.css';
import './i18n';

function App() {
  // const routeResult = useRoutes(AppRouter);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <ErrorNotification></ErrorNotification>
            <AppRoute />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </Suspense>

  )
}
export default App