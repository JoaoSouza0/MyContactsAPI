// const { v4 } = require('uuid');
const db = require('../../database');

class ContactRepositories {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    // Lista TODOS os contatos
    const rows = await db.query(`SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);
    return rows;
  }

  async findById(id) {
    // Mostra UM contato
    const [row] = await db.query(`SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    // Mostra UM contato
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async delete(id) {
    // Deletar UM contato
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
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

  async update(id, {
    name, email, number, category_id,
  }) {
    // atualiza UM contato
    const [row] = await db.query(`UPDATE contacts
    SET name = $1, email = $2, phone=$3, category_id =$4
    WHERE id = $5
    RETURNING *`, [
      name, email, number, category_id,
      id]);

    return row;
  }
}
module.exports = new ContactRepositories();
