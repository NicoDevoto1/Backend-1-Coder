import * as service from '../services/services.service.js';

export const getServices = async (req, res) => {
    try {
        const { category, available, page, limit, sortBy, order } = req.query;
        const result = await service.getServices(category, available, page, limit, sortBy, order);
        
        res.status(200).json({
            status: "success",
            payload: result.docs, // El listado de servicios
            totalDocs: result.totalDocs,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};

export const getServiceById = async (req, res) => {
    try {
        const found = await service.getServiceById(req.params.sid);
        if (!found) return res.status(404).json({ error: "Servicio no encontrado" });
        res.status(200).json(found);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};

export const createService = async (req, res) => {
    try {
        const result = await service.createService(req.body);
        if (result.error) return res.status(400).json({ error: result.error });
        
        // EMITIR EVENTO EN TIEMPO REAL AL CREAR UN SERVICIO
        const io = req.app.get('io'); // Recuperamos io de la app
        if (io) {
            io.emit('newService', result); // Emitimos el servicio recién creado
        }

        res.status(201).json(result);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};

export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;
        const result = await service.updateService(sid, req.body);
        if (!result) return res.status(404).json({ error: "Servicio no encontrado" });
        res.status(200).json(result);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};

export const deleteService = async (req, res) => {
    try {
        const result = await service.deleteService(req.params.sid);
        if (!result) return res.status(404).json({ error: "Servicio no encontrado" });
        res.status(200).json(result);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
};