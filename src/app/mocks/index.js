const { v4 } = require('uuid');

module.exports = [
  {
    id: v4(),
    name: 'João Victor',
    email: 'joao.souza@email.com',
    number: 11993606013,
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Caique',
    email: 'Caique.estudante@email.com',
    number: 11993606013,
    category_id: v4(),
  },
];
