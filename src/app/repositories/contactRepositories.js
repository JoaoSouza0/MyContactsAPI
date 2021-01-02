const { v4 } = require('uuid');
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

  create({
    name, email, number, category_id,
  }) {
    // Cria UM contato
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        number,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
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
