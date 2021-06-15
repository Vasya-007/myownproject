import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import axios from 'axios';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const noop = () => {};

const useAPImethod = ({
  url, onCompelete = noop, debugTO, method = 'post', onError = noop,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const callbackRef = useRef({
    onCompelete,
    onError,
  });
  useEffect(() => {
    callbackRef.current = {
      onCompelete,
      onError,
    };
  }, [onCompelete, onError]);
  const call = useCallback(async (data) => {
    setIsLoading(true);
    if (debugTO) await wait(debugTO);
    try {
      const result = await axios(
        {
          url,
          data,
          method,

        },
      );
      await callbackRef.current.onCompelete(result.data);
    } catch (e) {
      const msg = e.message;
      callbackRef.current.onError(msg, e);
    } finally {
      setIsLoading(false);
    }
  },
  [debugTO, method, url]);
  return [call, isLoading];
};
export default useAPImethod;
