import { Component } from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, Button, Container, Typography } from '@mui/material';

import { logError } from 'src/utils';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, 'ErrorBoundary');
    this.setState({
      error,
      errorInfo,
    });

    // You can also log to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" color="error" gutterBottom>
              Oops! Something went wrong
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We&apos;re sorry for the inconvenience. An unexpected error has occurred.
            </Typography>

            {import.meta.env.DEV && this.state.error && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  textAlign: 'left',
                  overflow: 'auto',
                }}
              >
                <Typography variant="subtitle2" color="error" gutterBottom>
                  Error Details:
                </Typography>
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="outlined" onClick={() => (window.location.href = '/')}>
                Go to Home
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func,
  onReset: PropTypes.func,
};

export default ErrorBoundary;
