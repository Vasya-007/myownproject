import { Card } from 'react-bootstrap';
import { Link, generatePath } from 'react-router-dom';
import paths from '../../router/route-paths';
import classNames from './CoinCard.module.scss';

export default function CoinCard({ coin }) {
  return (
    <Link to={generatePath(paths.myCoinDetails, { id: coin._id })} className={classNames.cardLink}>
      <Card>
        <Card.Img variant="top" src={coin.image} alt={coin.name} />
        <Card.Title>{coin.name}</Card.Title>
        <Card.Body>
          <Card.Text>
            {/* Add some details */}
            Some quick example text to build on the card title and make up the bulk
            of the cards content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
