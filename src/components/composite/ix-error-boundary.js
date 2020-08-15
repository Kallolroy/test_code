import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }



  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">
            Something went wrong .Please login again.
        </Alert>
        </Snackbar>

        // <Redirect to={{ pathname: '/login' }} />

      )
    }
    return this.props.children;
  }
}


export default ErrorBoundary;