// const { v4 } = require('uuid');
const db = require('../../database');

let contacts = require('../mocks/index');

class ContactRepositories {
  findAll() {
    // Lista TODOS os contatos
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    // Mostra UM contato
    return new Promise((resolve) => resolve(
      contacts.find((item) => item.id === id),
    ));
  }

  findByEmail(email) {
    // Mostra UM contato
    return new Promise((resolve) => resolve(
      contacts.find((item) => item.email === email),
    ));
  }

  delete(id) {
    // Deletar UM contato
    return new Promise((resolve) => {
      contacts = contacts.filter((item) => item.id !== id);
      resolve();
    });
  }

  async create({
    name, email, number, category_id,
  }) {
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
     VALUES($1 ,$2, $3, $4)
    RETURNING name, email`, [
      name, email, number, category_id,
    ]);

    return row;
  }

  update(id, {
    name, email, number, category_id,
  }) {
    // atualiza UM contato
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        number,
        category_id,
      };

      contacts = contacts.map((item) => (item.id === id ? updateContact : item));

      resolve(updateContact);
    });
  }
}
module.exports = new ContactRepositories();
