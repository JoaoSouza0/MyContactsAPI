const repositories = require('../repositories/contactRepositories');

class ContactController {
  async index(request, response) {
    // Lista TODOS os contatos
    const contacts = await repositories.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    // Mostra UM contato
    const { id } = request.params;

    const contact = await repositories.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'user not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Salva o item

    const {
      name, email, number, category_id,
    } = request.body;

    const isRequired = !name || !email;

    if (isRequired) {
      return response.status(400).json({ error: 'Is required' });
    }

    const contactEmailExists = await repositories.findByEmail(email);

    if (contactEmailExists) {
      return response.status(400).json({ error: 'Email has been used' });
    }

    const contactCreate = await repositories.create({
      name, email, number, category_id,
    });

    response.json(contactCreate);
  }

  async update(request, response) {
    // Atualiza o item
    const { id } = request.params;
    const {
      name, email, number, category_id,
    } = request.body;

    const contactFindId = await repositories.findById(id);

    if (!contactFindId) {
      return response.status(404).json({ error: 'User not found' });
    }

    const contactFindEmail = await repositories.findByEmail(email);

    if (contactFindEmail && contactFindEmail.id !== id) {
      return response.status(400).json({ error: 'This email alredy has been in used' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const updateContact = await repositories.update(id, {
      name, email, number, category_id,
    });

    response.status(200).json(updateContact);
  }

  async delete(request, response) {
    // Deleta o item
    const { id } = request.params;

    const contact = await repositories.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'user not found' });
    }

    await repositories.delete(id);

    response.sendStatus(204); // 204 = No content
  }
}

module.exports = new ContactController();
