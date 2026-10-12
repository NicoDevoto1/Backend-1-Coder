import * as service from '../services/bookings.service.js';

export const createBooking = async (req, res) => {
    try {
        const result = await service.createBooking(req.body);
        if (result.error) return res.status(400).json({ error: result.error });
        res.status(201).json(result);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};

export const getBookingById = async (req, res) => {
    try {
        const found = await service.getBookingById(req.params.bid);
        if (!found) return res.status(404).json({ error: "Reserva no encontrada" });
        res.status(200).json(found);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const result = await service.addServiceToBooking(bid, sid);
        
        if (result.error) return res.status(404).json({ error: result.error });
        res.status(200).json({ message: "Servicio agregado", booking: result });
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};