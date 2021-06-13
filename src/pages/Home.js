import { toast } from 'react-toastify';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CoinListGrid from '../components/coin/CoinListGrid';
import MockDataservice from '../services/MockDataservice';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const noop = () => {};

const useAPImethod = ({
  url, onCompelete = noop, debugTO, method = 'post', onError = noop,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
      await onCompelete(result.data);
      //  fetchCoin();
    } catch (e) {
      const msg = e.message;
      onError(msg, e);
    } finally {
      setIsLoading(false);
    }
  },
  [debugTO, method, onCompelete, onError, url]);
  return [call, isLoading];
};
const useAPIQuery = ({ url, debugTO }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  // const onCompelete = useCallback((d) => {
  //   setData(d);
  // }, []);
  // const onError = useCallback((msg) => {
  //   setError(msg);
  // }, []);
  const [fetch, isLoading] = useAPImethod({
    method: 'get',
    url,
    onCompelete: setData,
    onError: setError,
    debugTO,
  });
  useEffect(() => {
    fetch();
  }, [fetch]);
  return {
    data, isLoading, refetch: fetch, error,
  };
};

export default function Home() {
  const {
    data: coinList,
    isLoading,
    error,
    refetch: refetchCoin,
  } = useAPIQuery({ url: '/api/coin' });

  const [addCoin, isAddingCoin] = useAPImethod(
    {
      url: '/api/coin/create',
      onCompelete: refetchCoin,
      debugTO: 1000,
      onError: (msg) => {
        toast.error(msg);
      },
    },
  );
  const [resetCoin, isResetingCoin] = useAPImethod(
    {
      url: '/api/coin/reset',
      onCompelete: refetchCoin,
      debugTO: 1000,
      onError: (msg) => {
        toast.error(msg);
      },
    },
  );

  // const [isshiftCoin, setIsShiftCoin] = useState(false);
  // const shiftCoin = async () => {
  //   setIsShiftCoin(true);
  //   await wait(1000);
  //   try {
  //     axios(
  //       {
  //         url: '/api/coin/shift',
  //         method: 'post',

  //       },
  //       fetchCoin(),
  //     );
  //   } catch (e) {
  //     const msg = e.message;
  //     toast.error(msg);
  //   } finally {
  //     setIsShiftCoin(false);
  //   }
  // };

  return (
    <>
      <h1>Coin List</h1>
      { isLoading && !coinList?.length ? (
        <div>Loading..</div>

      ) : (
        <>
          <Button
            onClick={() => addCoin(MockDataservice.generateCoin())}
            disabled={isAddingCoin || isResetingCoin}
          >
            { isAddingCoin ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            {' '}
            Add coin
          </Button>
          <Button
            onClick={() => resetCoin()}
            disabled={isResetingCoin || isAddingCoin}
          >
            { isResetingCoin ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            {' '}
            Reset coin
          </Button>
          {/* <Button
            onClick={shiftCoin}
            disabled={isshiftCoin || isAddingCoin
            || isResetingCoin}
          >
            { isshiftCoin ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            {' '}
            Delet first coin
          </Button> */}
          {error ? <Alert variant="danger">{error}</Alert> : null}
          {Array.isArray(coinList) ? (

            <>
              {coinList.length ? (
                <CoinListGrid coinList={coinList} />

              ) : (
                <div>No coins in list. Please click "Add coin"</div>
              )}

            </>
          ) : null}
        </>
      )}
    </>
  );
}
