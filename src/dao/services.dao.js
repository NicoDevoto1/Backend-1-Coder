import { ServiceModel } from '../models/service.model.js';

export default class ServicesDAO {
    async getAll(query = {}) { return await ServiceModel.find(query); }
    async getById(id) { return await ServiceModel.findById(id); }
    async create(data) { return await ServiceModel.create(data); }
    async update(id, data) { return await ServiceModel.findByIdAndUpdate(id, data, { new: true }); }
    async delete(id) { return await ServiceModel.findByIdAndDelete(id); }
}