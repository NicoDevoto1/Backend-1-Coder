import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export default class ServiceManager {
    constructor() {
        // Apunta al archivo services.json dentro de la carpeta data
        this.path = path.resolve('src', 'data', 'services.json');
    }

    // getServices() → devuelve todos los servicios
    async getServices() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe aún, devuelve un array vacío
            return [];
        }
    }

    // getServiceById(id) → devuelve el servicio o null/mensaje de error
    async getServiceById(id) {
        const services = await this.getServices();
        const service = services.find((s) => s.id === id);
        
        // Devuelve el servicio, o null si no lo encuentra
        return service || null; 
    }

    // addService(serviceData) → agrega un servicio, genera ID automático, valida campos y rechaza incompletos
    async addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        // Valida que estén presentes TODOS los campos. 
        // Uso 'available === undefined' porque si 'available' es false, es un dato válido.
        if (!name || !description || !duration || !price || !category || available === undefined) {
            return { error: 'No se puede agregar el servicio. Faltan campos obligatorios.' };
        }

        const services = await this.getServices();
        
        const newService = {
            id: randomUUID(), // Se genera automáticamente (no se recibe como parámetro)
            name,
            description,
            duration,
            price,
            category,
            available
        };

        services.push(newService);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        
        return newService;
    }

    // updateService(id, updatedData) → actualiza el servicio, no permite modificar ID, devuelve null si no existe
    async updateService(id, updatedData) {
        const services = await this.getServices();
        const serviceIndex = services.findIndex((s) => s.id === id);

        if (serviceIndex === -1) {
            return null; // Devuelve null si no existe
        }

        // Separo el 'id' (si es que lo enviaron en updatedData) del resto de los datos para NO modificarlo
        const { id: _, ...dataToUpdate } = updatedData;

        services[serviceIndex] = {
            ...services[serviceIndex],
            ...dataToUpdate,
            id: services[serviceIndex].id // Mantengo estrictamente el ID original
        };

        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        
        return services[serviceIndex];
    }

    // deleteService(id) → elimina el servicio, devuelve null si no existe
    async deleteService(id) {
        const services = await this.getServices();
        const serviceIndex = services.findIndex((s) => s.id === id);

        if (serviceIndex === -1) {
            return null; // Devuelve null si no existe
        }

        // Elimina el elemento del array y lo guarda en la variable deletedService
        const [deletedService] = services.splice(serviceIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        
        return deletedService;
    }
}