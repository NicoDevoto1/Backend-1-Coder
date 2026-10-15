import ServicesRepository from '../repositories/services.repository.js';

const repo = new ServicesRepository();

export const getServices = async (category, available, page = 1, limit = 10, sortBy, order) => {
    const query = {};
    if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    if (available !== undefined) query.available = available === 'true';

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    if (sortBy) {
        options.sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    }

    return await repo.getAll(query, options);
};
export const getServiceById = async (id) => await repo.getById(id);

export const createService = async (data) => {
    const { name, description, duration, price, category, available } = data;
    if (!name || !description || !duration || !price || !category || available === undefined) {
        return { error: 'Faltan campos obligatorios' };
    }
    // Mongo genera el _id automáticamente
    return await repo.create({ name, description, duration, price, category, available });
};

export const updateService = async (id, data) => await repo.update(id, data);
export const deleteService = async (id) => await repo.delete(id);