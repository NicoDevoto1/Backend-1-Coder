//Actúa como puente. Por ahora solo redirige al DAO, pero en el futuro permitirá cambiar de Base de Datos sin afectar al resto del código.

import ServicesDAO from '../dao/services.dao.js';
const dao = new ServicesDAO();

export default class ServicesRepository {
    async getAll(query, options) { return await dao.getAll(query, options); }
    async getById(id) { return await dao.getById(id); }
    async create(data) { return await dao.create(data); }
    async update(id, data) { return await dao.update(id, data); }
    async delete(id) { return await dao.delete(id); }
}