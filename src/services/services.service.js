//Contiene toda la lógica de negocio (validaciones, generación de IDs y algoritmos). NO conoce req ni res.

import ServicesRepository from '../repositories/services.repository.js';
import { randomUUID } from 'crypto';

const repo = new ServicesRepository();

export const getServices = async (category, available) => {
    let services = await repo.getAll();
    if (category) {
        services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (available !== undefined) {
        const isAvailable = available === 'true';
        services = services.filter(s => s.available === isAvailable);
    }
    return services;
};

export const getServiceById = async (id) => await repo.getById(id);

export const createService = async (data) => {
    const { name, description, duration, price, category, available } = data;
    if (!name || !description || !duration || !price || !category || available === undefined) {
        return { error: 'Faltan campos obligatorios' };
    }
    const newService = { id: randomUUID(), name, description, duration, price, category, available };
    return await repo.create(newService);
};

export const updateService = async (id, data) => await repo.update(id, data);
export const deleteService = async (id) => await repo.delete(id);