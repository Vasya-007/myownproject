import { toast } from 'react-toastify';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CoinListGrid from '../components/coin/CoinListGrid';
import MockDataservice from '../services/MockDataservice';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const noop = () => {};

const useAPImethod = ({ url, onCompelete = noop, debugTO }) => {
  const [isLoading, setIsLoading] = useState(false);
  const method = async (data) => {
    setIsLoading(true);
    if (debugTO) await wait(1000);
    try {
      const result = await axios(
        {
          url,
          data,
          method: 'post',

        },
      );
      await onCompelete(result);
      //  fetchCoin();
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };
  return [method, isLoading];
};
const useAPIQuery = ({ url, onCompelete = noop, debugTO }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const method = useCallback(async () => {
    setIsLoading(true);
    if (debugTO) await wait(debugTO);
    try {
      const result = await axios(
        {
          url,
          method: 'get',

        },
      );
      setData(result.data);
      await onCompelete(result);
    } catch (e) {
      const msg = e.message;
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [debugTO, onCompelete, url]);
  useEffect(() => {
    method();
  }, [method]);

  return {
    data, isLoading, refetch: method, error,
  };
};

export default function Home() {
  const {
    data: coinList,
    isLoading,
    error,
    refetch: refetchCoin,
  } = useAPIQuery({ url: '/api/coin' });

  const [addCoin, isAddingCoin] = useAPImethod({ url: '/api/coin/create', onCompelete: refetchCoin, debugTO: 1000 });
  const [resetCoin, isResetingCoin] = useAPImethod({ url: '/api/coin/reset', onCompelete: refetchCoin, debugTO: 1000 });

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
