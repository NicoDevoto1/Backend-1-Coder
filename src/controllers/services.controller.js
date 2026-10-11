import ServiceManager from '../managers/ServiceManager.js';

const manager = new ServiceManager();

export const getServices = async (req, res) => {
    try {
        let services = await manager.getServices();
        const { category, available } = req.query;

        if (category) {
            services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }
        
        if (available !== undefined) {
            const isAvailable = available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await manager.getServiceById(sid);
        
        if (!service) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const createService = async (req, res) => {
    try {
        const newService = await manager.addService(req.body);
        
        if (newService.error) {
            return res.status(400).json({ error: newService.error });
        }
        
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el servicio" });
    }
};

export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedData = req.body;
        
        if (updatedData.price !== undefined) {
            if (typeof updatedData.price !== 'number' || updatedData.price < 0) {
                return res.status(400).json({ error: "El precio debe ser un número positivo" });
            }
        }
        
        if (updatedData.duration !== undefined) {
            if (typeof updatedData.duration !== 'number' || updatedData.duration <= 0) {
                return res.status(400).json({ error: "La duración debe ser un número mayor a cero" });
            }
        }
        
        const updatedService = await manager.updateService(sid, updatedData);
        
        if (!updatedService) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el servicio" });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await manager.deleteService(sid);
        
        if (!deletedService) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        res.status(200).json(deletedService);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el servicio" });
    }
};