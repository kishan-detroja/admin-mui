import { useState, useCallback } from 'react';

import { logError, handleApiError } from 'src/utils';

/**
 * Custom hook for async operations
 * @returns {Object} Async state and execute function
 */
export const useAsync = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFunction, onSuccess, onError) => {
    setStatus('loading');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setStatus('error');
      logError(err, 'useAsync');
      
      if (onError) {
        onError(errorMessage);
      }
      
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return {
    execute,
    reset,
    status,
    data,
    error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle',
  };
};
