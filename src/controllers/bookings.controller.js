import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingManager.createBooking(req.body);
        
        if (newBooking.error) {
            return res.status(400).json({ error: newBooking.error });
        }
        
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

export const getBookingById = async (req, res) => {
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
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;

        const bookingExists = await bookingManager.getBookingById(bid);
        if (!bookingExists) {
            return res.status(404).json({ error: 'La reserva especificada no existe' });
        }

        const serviceExists = await serviceManager.getServiceById(sid);
        if (!serviceExists) {
            return res.status(404).json({ error: 'El servicio especificado no existe' });
        }

        const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
        
        res.status(200).json({
            message: 'Servicio agregado a la reserva con éxito',
            booking: updatedBooking
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el servicio a la reserva' });
    }
};