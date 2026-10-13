import * as servicesService from '../services/services.service.js';

export const renderServices = async (req, res) => {
    try {
        const data = await servicesService.getServices();
        const services = data.map(s => s.toObject ? s.toObject() : s);
        res.render('services', { title: 'Nuestros Servicios', services });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};

export const renderAvailability = async (req, res) => {
    try {
        // Aprovechamos tu lógica existente pasando 'true' como segundo parámetro (available)
        const data = await servicesService.getServices(undefined, 'true');
        const availableServices = data.map(s => s.toObject ? s.toObject() : s);
        res.render('availability', { title: 'Servicios Disponibles', services: availableServices });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};