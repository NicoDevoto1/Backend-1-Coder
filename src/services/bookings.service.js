import BookingsRepository from '../repositories/bookings.repository.js';
import { getServiceById } from './services.service.js';
import { randomUUID } from 'crypto';

const repo = new BookingsRepository();

export const createBooking = async (data) => {
    const { clientName, clientEmail, date, time, status } = data;
    if (!clientName || !clientEmail || !date || !time) {
        return { error: 'Faltan campos obligatorios' };
    }
    const newBooking = {
        id: randomUUID(),
        clientName, clientEmail, date, time,
        status: status || 'pending',
        services: []
    };
    return await repo.create(newBooking);
};

export const getBookingById = async (id) => await repo.getById(id);

export const addServiceToBooking = async (bookingId, serviceId) => {
    const booking = await repo.getById(bookingId);
    if (!booking) return { error: 'Reserva no encontrada' };

    const serviceExists = await getServiceById(serviceId);
    if (!serviceExists) return { error: 'Servicio no encontrado' };

    const serviceIndex = booking.services.findIndex(s => s.service === serviceId);
    if (serviceIndex !== -1) {
        booking.services[serviceIndex].quantity += 1;
    } else {
        booking.services.push({ service: serviceId, quantity: 1 });
    }

    return await repo.update(bookingId, booking);
};