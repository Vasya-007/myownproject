import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CoinListGrid from '../components/coin/CoinListGrid';
import MockDataservice from '../services/MockDataservice';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [error, setError] = useState(null);
  const fetchCoin = () => {
    setIsLoading(true);
    return axios('/api/coin')
      .then((response) => {
      // eslint-disable-next-line no-console
        setIsLoading(false);
        setCoinList(response.data);
      }).catch((e) => {
        const msg = e.message;
        setIsLoading(false);
        setError(msg);
      });
  };

  useEffect(() => {
    fetchCoin();
  }, []);
  const [isAddingCoin, setIsAddingCoin] = useState(false);
  const addCoin = async () => {
    setIsAddingCoin(true);
    await wait(1000);
    const coin = MockDataservice.generateCoin();
    try {
      axios(
        {
          url: '/api/coin/create',
          data: coin,
          method: 'post',

        },
      );
      fetchCoin();
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsAddingCoin(false);
    }
  };
  const [isResetingCoin, setIsResetingCoin] = useState(false);
  const resetCoin = async () => {
    setIsResetingCoin(true);
    await wait(1000);
    try {
      axios(
        {
          url: '/api/coin/reset',
          method: 'post',

        },
        fetchCoin(),
      );
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsResetingCoin(false);
    }
  };
  const [isshiftCoin, setIsShiftCoin] = useState(false);
  const shiftCoin = async () => {
    setIsShiftCoin(true);
    await wait(1000);
    try {
      axios(
        {
          url: '/api/coin/shift',
          method: 'post',

        },
        fetchCoin(),
      );
    } catch (e) {
      const msg = e.message;
      toast.error(msg);
    } finally {
      setIsShiftCoin(false);
    }
  };

  return (
    <>
      <h1>Coin List</h1>
      { isLoading && !coinList.length ? (
        <div>Loading..</div>

      ) : (
        <>
          <Button onClick={addCoin} disabled={isAddingCoin || isResetingCoin || isshiftCoin}>
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
            onClick={resetCoin}
            disabled={isResetingCoin || isAddingCoin
            || isshiftCoin}
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
          <Button
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
          </Button>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          {coinList.length ? (
            <CoinListGrid coinList={coinList} />

          ) : (
            <div>No coins in list. Please click "Add coin"</div>
          )}
        </>
      )}
    </>
  );
}
