/* eslint-disable no-unreachable */
import { Row, Col } from 'react-bootstrap';
import CoinCard from '../components/coin/CoinCard';
import { coinlist } from '../__mocks__/coinList';

export default function Home() {
  const coinList = coinlist();
  return (
    <>
      <p>Coin List</p>
      <Row>
        {coinList.map((coin) => (
          <Col lg="3" md="4" sm="6" xs="12" className="mb-4">
            <CoinCard coin={coin} />
          </Col>
        ))}
      </Row>
    </>

  );
}
