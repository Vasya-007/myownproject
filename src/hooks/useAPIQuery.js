import { useEffect, useState } from 'react';
import useAPImethod from './useAPIMethod';

const useAPIQuery = ({ url, call, debugTO }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [fetch, isLoading] = useAPImethod({
    method: 'get',
    url,
    onCompelete: setData,
    onError: setError,
    debugTO,
    call,
  });
  useEffect(() => {
    setError(null);
    fetch();
  }, [fetch]);
  return {
    data, isLoading, refetch: fetch, error,
  };
};
export default useAPIQuery;
