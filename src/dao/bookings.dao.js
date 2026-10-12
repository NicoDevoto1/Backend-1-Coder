import { BookingModel } from '../models/booking.model.js';

export default class BookingsDAO {
    // Usamos populate para traer los datos del servicio en vez de solo el ID
    async getById(id) { return await BookingModel.findById(id).populate('services.service'); }
    async create(data) { return await BookingModel.create(data); }
    async update(id, data) { return await BookingModel.findByIdAndUpdate(id, data, { new: true }); }
}