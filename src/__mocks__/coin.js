/* eslint-disable arrow-body-style */
// type Coins {
//     _id: ID!
//     name: String
//     Price: DoubleRange (optional)
//     Exchange_list: String (optional)
//     authorID: ID!
//     Description: String
//     Photo: Photo
//     Added: Datatime
//     Material: String
//     State: String
//     Defects: String
// }

import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line import/prefer-default-export
export function coinlistFactory(n = 50) {
  return [...new Array(n)].map(coinMockfactory);
}

function coinImageFactory({ width = 320, height = 240 } = {}) {
  return `https://loremflickr.com/${width}/${height}/coins?random=${faker.datatype.number()}`;
}

export function coinMockfactory() {
  return {
    _id: faker.datatype.uuid(),
    name: faker.name.title(),
    price: faker.commerce.price(),
    exchange_list: faker.name.title(),
    authorID: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    image: coinImageFactory(),
    added: faker.datatype.datetime(),
    material: faker.lorem.word(),
    state: faker.lorem.word(),
    defects: faker.lorem.word(),
    weight: weightFactory(),
  };
}

export function unitFactory() {
  const units = [
    'ml',
    'g',
  ];
  return faker.random.arrayElement(units);
}

export function weightFactory() {
  return {
    weight: faker.datatype.number(),
    unit: unitFactory(),
  };
}
