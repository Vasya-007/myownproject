import { toast } from 'react-toastify';
import React from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CoinListGrid from '../components/coin/CoinListGrid';
import MockDataservice from '../services/MockDataservice';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      coinList: [],
      isAddingCoin: false,
      isResetingCoin: false,
      isshiftCoin: false,
    };
  }

  componentDidMount() {
    this.fetchCoin();
  }

  fetchCoin =() => {
    this.setState({ isLoading: true });
    return axios('/api/coin').then((response) => {
      // eslint-disable-next-line no-console
      this.setState({ coinList: response.data, isLoading: false });
    }).catch((error) => {
      const msg = error.message;
      this.setState({ error: msg, isLoading: false });
    });
  }

  addCoin = async () => {
    this.setState({ isAddingCoin: true });
    // await wait(3000);
    const coin = MockDataservice.generateCoin();

    axios(
      {
        url: '/api/coin/create',
        data: coin,
        method: 'post',

      },
    ).then(() => this.fetchCoin()).catch((error) => {
      const msg = error.message;
      toast.error(msg);
    }).finally(() => {
      this.setState({ isAddingCoin: false });
    });
    // this.setState({ coinList: [coin, ...coinList] });
  }

  resetCoin = async () => {
    this.setState({ isResetingCoin: true });
    // await wait(3000);
    axios(
      {
        url: '/api/coin/reset',
        method: 'post',

      },
    ).then(() => this.fetchCoin()).catch((error) => {
      const msg = error.message;
      toast.error(msg);
    }).finally(() => {
      this.setState({ isResetingCoin: false });
    });
  }

  shiftCoin = async () => {
    this.setState({ isshiftCoin: true });
    // await wait(3000);
    axios(
      {
        url: '/api/coin/shift',
        method: 'post',

      },
    ).then(() => this.fetchCoin()).catch((error) => {
      const msg = error.message;
      toast.error(msg);
    }).finally(() => {
      this.setState({ isshiftCoin: false });
    });
  }

  render() {
    const {
      coinList, isLoading, error, isAddingCoin, isResetingCoin, isshiftCoin,
    } = this.state;
    return (
      <>
        <h1>Coin List</h1>
        { isLoading && !coinList.length ? (
          <div>...Loading...</div>

        ) : (
          <>
            <Button onClick={this.addCoin} disabled={isAddingCoin || isResetingCoin || isshiftCoin}>
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
              onClick={this.resetCoin}
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
              onClick={this.shiftCoin}
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
}
