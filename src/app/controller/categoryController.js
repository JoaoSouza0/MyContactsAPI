const repositories = require('../repositories/categoryRepositories');

class CategoriesController {
  async index(request, response) {
    const categories = await repositories.findAll();

    return response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Is required' });
    }

    const category = await repositories.create({ name });

    return response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await repositories.findById(id);

    if (!category) {
      return response.status(404).json({ erro: 'User not found ' });
    }

    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Is required' });
    }

    const category = await repositories.findById(id);

    if (!category) {
      return response.json({ error: 'User not found' });
    }

    const updateCategory = await repositories.update(id, { name });

    return response.status(200).json(updateCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await repositories.findById(id);

    if (!category) {
      return response.status(404).json({ erro: 'User not found' });
    }

    await repositories.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new CategoriesController();
