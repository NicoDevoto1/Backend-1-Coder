import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const manager = new ServiceManager();

// GET /api/services -> Devuelve todos (acepta filtros por query params)
router.get('/', async (req, res) => {
    try {
        let services = await manager.getServices();
        
        // Extraemos los query params de la URL (?category=...&available=...)
        const { category, available } = req.query;
        
        if (category) {
            services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }
        
        if (available !== undefined) {
            // available llega como string ("true" o "false"), lo convertimos a booleano
            const isAvailable = available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// GET /api/services/:sid -> Devuelve un servicio por ID
router.get('/:sid', async (req, res) => {
    try {
        // req.params lee el ":sid" de la URL
        const { sid } = req.params;
        const service = await manager.getServiceById(sid);
        
        if (!service) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// POST /api/services -> Crea un servicio
router.post('/', async (req, res) => {
    try {
        // req.body contiene el JSON que envía el usuario
        const serviceData = req.body;
        const newService = await manager.addService(serviceData);
        
        // Si el manager devolvió un error (faltan campos), respondemos con Status 400
        if (newService.error) {
            return res.status(400).json({ error: newService.error });
        }
        
        // Si todo salió bien, respondemos con 201 (Created)
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el servicio" });
    }
});

// PUT /api/services/:sid -> Actualiza un servicio
router.put('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedData = req.body;
        
        const updatedService = await manager.updateService(sid, updatedData);
        
        if (!updatedService) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el servicio" });
    }
});

// DELETE /api/services/:sid -> Elimina un servicio
router.delete('/:sid', async (req, res) => {
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
});

export default router;