/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CoinCard from './CoinCard';

export default class CoinListGrid extends React.Component {
  render() {
    const { coinList } = this.props;
    return (
      <Row>
        {coinList.map((coin) => (
          <Col key={coin._id} lg="3" md="4" sm="6" xs="12" className="mb-4">
            <CoinCard coin={coin} />
          </Col>
        ))}
      </Row>
    );
  }
}
