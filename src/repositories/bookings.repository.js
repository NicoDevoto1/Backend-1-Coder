import BookingsDAO from '../dao/bookings.dao.js';
const dao = new BookingsDAO();

export default class BookingsRepository {
    async getById(id) { return await dao.getById(id); }
    async create(data) { return await dao.create(data); }
    async update(id, data) { return await dao.update(id, data); }
}