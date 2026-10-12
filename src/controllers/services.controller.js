import * as service from '../services/services.service.js';

export const getServices = async (req, res) => {
    try {
        const { category, available } = req.query;
        const services = await service.getServices(category, available);
        res.status(200).json(services);
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