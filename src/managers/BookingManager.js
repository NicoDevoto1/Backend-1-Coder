// Este archivo manejará la creación de la reserva y la lógica para incrementar la cantidad si el servicio ya existe en el array.

import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export default class BookingManager {
    constructor() {
        this.path = path.resolve('src', 'data', 'bookings.json');
    }

    async getBookings() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, status } = bookingData;

        if (!clientName || !clientEmail || !date || !time) {
            return { error: 'Faltan campos obligatorios para crear la reserva.' };
        }

        const bookings = await this.getBookings();

        const newBooking = {
            id: randomUUID(),
            clientName,
            clientEmail,
            date,
            time,
            status: status || 'pending', // Por defecto será 'pending' si no se envía
            services: [] // Inicia con el array de servicios vacío
        };

        bookings.push(newBooking);
        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));

        return newBooking;
    }

    async getBookingById(id) {
        const bookings = await this.getBookings();
        const booking = bookings.find((b) => b.id === id);
        return booking || null;
    }

    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.getBookings();
        const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

        if (bookingIndex === -1) {
            return null; // Reserva no encontrada
        }

        const booking = bookings[bookingIndex];
        
        // Verifica si el servicio ya está en el array de esta reserva
        const serviceIndex = booking.services.findIndex((s) => s.service === serviceId);

        if (serviceIndex !== -1) {
            // Si ya existe, incrementa la cantidad
            booking.services[serviceIndex].quantity += 1;
        } else {
            // Si no existe, lo agrega con cantidad 1
            booking.services.push({ service: serviceId, quantity: 1 });
        }

        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return booking;
    }
}