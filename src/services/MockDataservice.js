import { coinlistFactory } from '../__mocks__/coin';

class MockDataservice {
  constructor() {
    this.coinList = coinlistFactory();
  }

  findCoinId(_id) {
    return this.coinList.find((coin) => coin._id === _id);
  }

  getCoins() {
    return this.coinList;
  }
}
export default new MockDataservice();
