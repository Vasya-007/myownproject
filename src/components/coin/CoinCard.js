import { Card } from 'react-bootstrap';

export default function CoinCard({ coin }) {
  return (

    <Card>
      <Card.Img variant="top" src={coin.image} alt={coin.name} />
      <Card.Title>{coin.name}</Card.Title>
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          of the cards content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
