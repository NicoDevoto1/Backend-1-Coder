//Acá importamos ambos managers, para validar la existencia tanto de la reserva como del servidor antes de ser unificados.

import { Router } from 'express';
import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const bookingManager = new BookingManager();
const serviceManager = new ServiceManager(); // Se instancia para validar que el servicio exista

// POST /api/bookings -> Crea una reserva
router.post('/', async (req, res) => {
    try {
        const newBooking = await bookingManager.createBooking(req.body);
        
        if (newBooking.error) {
            return res.status(400).json({ error: newBooking.error });
        }
        
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
});

// GET /api/bookings/:bid -> Devuelve una reserva por ID
router.get('/:bid', async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await bookingManager.getBookingById(bid);
        
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST /api/bookings/:bid/services/:sid -> Agrega un servicio a la reserva
router.post('/:bid/services/:sid', async (req, res) => {
    try {
        const { bid, sid } = req.params;

        // 1. Validar que la reserva exista
        const bookingExists = await bookingManager.getBookingById(bid);
        if (!bookingExists) {
            return res.status(404).json({ error: 'La reserva especificada no existe' });
        }

        // 2. Validar que el servicio exista
        const serviceExists = await serviceManager.getServiceById(sid);
        if (!serviceExists) {
            return res.status(404).json({ error: 'El servicio especificado no existe' });
        }

        // 3. Agregar el servicio a la reserva
        const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
        
        res.status(200).json({
            message: 'Servicio agregado a la reserva con éxito',
            booking: updatedBooking
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el servicio a la reserva' });
    }
});

export default router;