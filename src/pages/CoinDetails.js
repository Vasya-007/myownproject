// import { Alert } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CoinCard from '../components/coin/CoinCard';
import MockDataservice from '../services/MockDataservice';

export default function CoinDetails() {
  const params = useParams();

  const coin = MockDataservice.findCoinId(params.id);

  if (!coin) {
    return <Alert variant="warning">Coin not found</Alert>;
  }
  return (
    <>
      {/* <h1>Coin Details</h1> */}
      <pre>
        <CoinCard coin={coin} />
        {JSON.stringify(coin, null, 2)}
      </pre>
    </>

  );
}
