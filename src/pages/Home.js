import { toast } from 'react-toastify';
import React from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import CoinListGrid from '../components/coin/CoinListGrid';
import MockDataservice from '../services/MockDataservice';
import useAPImethod from '../hooks/useAPIMethod';
import useAPIQuery from '../hooks/useAPIQuery';
import APIService from '../services/APIService';

export default function Home() {
  const {
    data: coinList,
    isLoading,
    error,
    refetch: refetchCoin,
  } = useAPIQuery({ call: APIService.getCoinList });

  const [addCoin, isAddingCoin] = useAPImethod(
    {
      call: APIService.addCoin,
      onCompelete: refetchCoin,
      debugTO: 1000,
      onError: (msg) => {
        toast.error(msg);
      },
    },
  );
  const [resetCoin, isResetingCoin] = useAPImethod(
    {
      call: APIService.resetCoin,
      onCompelete: refetchCoin,
      debugTO: 1000,
      onError: (msg) => {
        toast.error(msg);
      },
    },
  );
  // useEffect(() => {
  //   resetCoin();
  // }, [resetCoin]);

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
