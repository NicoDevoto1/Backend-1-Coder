import * as servicesService from '../services/services.service.js';

export const renderServices = async (req, res) => {
    try {
        const data = await servicesService.getServices();
        // Agregamos .docs para apuntar directamente al array de resultados
        const services = data.docs.map(s => s.toObject ? s.toObject() : s);
        res.render('services', { title: 'Nuestros Servicios', services });
    } catch (error) {
        console.log("🔥 Error en renderServices:", error);
        res.status(500).send('Error interno del servidor');
    }
};

export const renderAvailability = async (req, res) => {
    try {
        const data = await servicesService.getServices(undefined, 'true');
        // Agregamos .docs para apuntar directamente al array de resultados
        const availableServices = data.docs.map(s => s.toObject ? s.toObject() : s);
        res.render('availability', { title: 'Servicios Disponibles', services: availableServices });
    } catch (error) {
        console.log("🔥 Error en renderServices:", error);
        res.status(500).send('Error interno del servidor');
    }
};