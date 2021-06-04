/* eslint-disable no-unreachable */
import { Row, Col } from 'react-bootstrap';
import CoinCard from '../components/coin/CoinCard';
import MockDataservice from '../services/MockDataservice';

export default function Home() {
  const coinList = MockDataservice.getCoins();
  return (
    <>
      <h1>Coin List</h1>
      <Row>
        {coinList.map((coin) => (
          <Col key={coin._id} lg="3" md="4" sm="6" xs="12" className="mb-4">
            <CoinCard coin={coin} />
          </Col>
        ))}
      </Row>
    </>

  );
}
